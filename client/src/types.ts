
export interface NytBooks {
    apiData: ApiData
}

interface ApiData {
    status: string;
    copyright: string;
    num_results: number;
    last_modified: string;
    results: Results;
}

interface Results {
    list_name: string;
    list_name_encoded: string;
    bestsellers_date: string;
    published_date: string;
    published_date_description: string;
    next_published_date: string;
    previous_published_date: string;
    display_name: string;
    normal_list_ends_at: number;
    updated: string;
    books: Book[];
}

interface Book {
    rank: number;
    rank_last_week: number;
    weeks_on_list: number;
    asterisk: number;
    dagger: number;
    primary_isbn10: string;
    primary_isbn13: string;
    publisher: string;
    description: string;
    price: string;
    title: string;
    author: string;
    contributor: string;
    contributor_note: string;
    book_image: string;
    book_image_width: number;
    book_image_height: number;
    amazon_product_url: string;
    age_group: string;
    book_review_link: string;
    first_chapter_link: string;
    sunday_review_link: string;
    article_chapter_link: string;
    isbns: Isbn[];
    buy_links: BuyLink[];
    book_uri: string;
}

interface Isbn {
    isbn10: string;
    isbn13: string;
}

interface BuyLink {
    url: string
}


export interface GoogleBooksResults {
    kind: string;
    totalItems: number;
    items: GoogleBooks[];
}

export interface GoogleBooks {
    kind: string;
    totalItems: number;
    items: Volume[];
}

interface Volume {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
    searchInfo?: SearchInfo;
}

interface VolumeInfo {
    title: string;
    authors: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount?: number;
    printType: string;
    categories?: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary?: PanelizationSummary;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}

interface SaleInfo {
    buyLink: string | undefined;
    country: string;
    saleability: string;
    isEbook: boolean;
}

interface AccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: Epub;
    pdf: Pdf;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
}

interface SearchInfo {
    textSnippet: string;
}

interface IndustryIdentifier {
    type: string;
    identifier: string;
}

interface ReadingModes {
    text: boolean;
    image: boolean;
}

interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
}

interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

interface Epub {
    isAvailable: boolean;
}

interface Pdf {
    isAvailable: boolean;
}

export type PostsType = Post[];

export interface Post {
    createdAt: string;
    postText: string;
    username: string;
    profilePicture: string;
    likes: User[]
    _id: string;
    __v: number;
}

export interface User {
    bio: string;
    birthday: string;
    createdAt: string;
    following: User[];
    followers: User[];
    posts: Post[];
    likes: Post[];
    profilePicture: string;
    coverPicture: string;
    books: Bookmarked[];
    username: string;
    _id: string;
    __v: number;
}

export interface Bookmarked {
    bookImage: string;
    bookIsbn: string;
    bookName: string;
    username: string;
    _id: string;
    __v: number;
}

export interface ReviewProps {
    reviewAverage: number,
    reviewLength: number
    reviewAlert: boolean
}

export interface bookInfoChildren {
    bookData: GoogleBooks | undefined,
    switchBookmarkStatus?: () => void,
    bookmark?: React.ReactNode,
    showGooglePlay?: boolean
    review?: ReviewProps
}