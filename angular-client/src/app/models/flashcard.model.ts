export interface Flashcard {
    FlashcardId?: number,
    Note?: string,
    Visibility?: boolean,
    FormatType: string,
    SourceURL?: string,
    SelfAssesment?: string,
    Difficulty?: number,
    LastReviewDate?: string,
    ReviewInterval?: number,
    Favorite?: boolean,
    Front?: string,
    Back?: string,
    Context?: string,
    Blank?: string,
    Tag?: string[],
    DeckId: number
}