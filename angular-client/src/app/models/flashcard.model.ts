export interface Flashcard {
    FlashcardId?: number,
    Note?: string,
    Visibility?: boolean,
    FormatType: string,
    SourceURL?: string,
    SelfAssesmentScore?: string,
    Difficulty?: number,
    LastStudyDate?: string,
    StudyInterval?: number,
    Favorite?: boolean,
    Front?: string,
    Back?: string,
    Context?: string,
    Blank?: string,
    Tags?: string[],
    DeckId: number
}