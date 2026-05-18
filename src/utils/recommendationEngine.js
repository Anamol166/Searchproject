const COMMON_WORDS = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'from', 'up', 'about', 'into', 'through', 'during', 'is', 'are', 'was', 'were',
    'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
])

function extractKeywords(title) {
    if (!title || typeof title !== 'string') return []

    return title
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 2 && !COMMON_WORDS.has(word))
        .map(word => word.replace(/[^\w]/g, ''))
        .filter(word => word.length > 0)
}

function levenshteinDistance(a, b) {
    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(0))

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j

    for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1,
                matrix[j - 1][i] + 1,
                matrix[j - 1][i - 1] + indicator
            )
        }
    }

    return matrix[b.length][a.length]
}

function areSimilarWords(word1, word2) {
    if (word1 === word2) return true
    if (Math.abs(word1.length - word2.length) > 2) return false

    const distance = levenshteinDistance(word1, word2)
    return distance <= 2
}

function calculateSimilarityScore(selectedItem, otherItem) {
    try {
        if (!selectedItem || !otherItem) return -1
        if (selectedItem.id === otherItem.id) return -1
        if (!selectedItem.title || !otherItem.title) return -1

        let score = 0

        const selectedKeywords = extractKeywords(selectedItem.title)
        const otherKeywords = extractKeywords(otherItem.title)

        if (selectedKeywords.length === 0 || otherKeywords.length === 0) {
            return 0
        }

        const exactMatches = selectedKeywords.filter(keyword =>
            otherKeywords.some(otherKeyword => keyword === otherKeyword)
        )
        score += exactMatches.length * 25

        const partialMatches = selectedKeywords.filter(keyword =>
            otherKeywords.some(otherKeyword =>
                keyword !== otherKeyword && areSimilarWords(keyword, otherKeyword)
            )
        )
        score += partialMatches.length * 15

        if (selectedItem.category && otherItem.category) {
            if (selectedItem.category === otherItem.category) {
                score += 20
            }
        }

        if (selectedItem.tags && otherItem.tags && Array.isArray(selectedItem.tags) && Array.isArray(otherItem.tags)) {
            const commonTags = selectedItem.tags.filter(tag =>
                otherItem.tags.some(otherTag => tag.toLowerCase() === otherTag.toLowerCase())
            )
            score += commonTags.length * 15
        }

        const lenDiff = Math.abs(selectedItem.title.length - otherItem.title.length)
        if (lenDiff < 20) {
            score += 5
        }

        return score
    } catch (error) {
        console.error('Error in calculateSimilarityScore:', error)
        return -1
    }
}

export function getRecommendations(selectedItem, collectionItems, limit = 6) {
    try {
        if (!selectedItem) {
            console.warn('getRecommendations: selectedItem is null or undefined')
            return []
        }

        if (!Array.isArray(collectionItems)) {
            console.warn('getRecommendations: collectionItems is not an array', collectionItems)
            return []
        }

        if (collectionItems.length === 0) {
            console.warn('getRecommendations: collectionItems is empty')
            return []
        }

        const validItems = collectionItems.filter(item =>
            item && item.id && item.title && item.thumbnail
        )

        if (validItems.length === 0) {
            console.warn('getRecommendations: No valid items found')
            return []
        }

        const maxLimit = Math.min(limit, 12)
        const minLimit = Math.max(maxLimit, 6)
        const finalLimit = Math.min(minLimit, validItems.length - 1)

        const scoredItems = validItems
            .map(item => ({
                item,
                score: calculateSimilarityScore(selectedItem, item)
            }))
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, finalLimit)
            .map(({ item }) => ({
                id: item.id,
                title: item.title,
                thumbnail: item.thumbnail
            }))

        if (scoredItems.length < 6 && validItems.length > 1) {
            const unused = validItems.filter(item =>
                item.id !== selectedItem.id &&
                !scoredItems.some(rec => rec.id === item.id)
            )

            const additional = unused
                .slice(0, Math.max(0, finalLimit - scoredItems.length))
                .map(item => ({
                    id: item.id,
                    title: item.title,
                    thumbnail: item.thumbnail
                }))

            return [...scoredItems, ...additional]
        }

        return scoredItems
    } catch (error) {
        console.error('Error in getRecommendations:', error)
        return []
    }
}

export function getRecommendationsWithScores(selectedItem, collectionItems, limit = 6) {
    if (!selectedItem || !Array.isArray(collectionItems)) return []

    return collectionItems
        .map(item => ({
            item,
            score: calculateSimilarityScore(selectedItem, item)
        }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
}