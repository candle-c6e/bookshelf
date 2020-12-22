interface Authors {
  author: string
}

export type Book = {
  id: number
  bookId: string;
  title: string;
  publishedDate: string;
  thumbnail: string;
  infoLink: string
  description: string
  authors: Authors[] & string
  isBookmark?: number
};