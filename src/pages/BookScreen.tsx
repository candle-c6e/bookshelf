import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { format, parseISO } from "date-fns";
import { useBook, useUpdateBookmark } from "../utils/books";
import { Book } from "../utils/types";
import { ReactComponent as BookPlaceholderSvg } from "../assets/book-placeholder.svg";
import { BookmarkButton } from "../components/Lib";
import { FaBook, FaTimes } from "react-icons/fa";

interface Params {
  id: string;
}

const Wrapper = styled.div`
  line-height: 1.6;
`;

const BookHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const BookImage = styled.div`
  max-width: 160px;

  svg,
  img {
    width: 160px;
  }
`;
const BookDetail = styled.div``;

const BookTitle = styled.h3``;

const BookAuthor = styled.div`
  margin-top: 1rem;
`;

const BookLink = styled.a`
  margin: var(--space-base);

  h3 {
    color: var(--primary);
    text-decoration: underline;
  }
`;

const BookPublishDate = styled.div``;

const BookInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const BookDescription = styled.div`
  margin-top: var(--space-base);
`;

const BookScreen = () => {
  const params = useParams<Params>();

  const { isLoading, data } = useBook(params.id);

  const { mutate } = useUpdateBookmark();

  const book = data as Book;

  const authors = book?.authors?.split(",");

  const handleBookmark = async () => {
    mutate(params.id);
  };

  if (isLoading) {
    return (
      <Wrapper>
        <BookHeader>
          <BookImage>
            <BookPlaceholderSvg />
          </BookImage>
          <BookDetail>
            <p>Loading...</p>
          </BookDetail>
        </BookHeader>
        <BookDescription></BookDescription>
      </Wrapper>
    );
  }

  if (!data) {
    return <h1>Not found.</h1>;
  }

  return (
    <Wrapper>
      <BookHeader>
        <BookImage>
          <img src={book.thumbnail} alt={book.title} />
        </BookImage>
        <BookDetail>
          <BookTitle>{book.title}</BookTitle>
          <BookAuthor>
            Authors:
            {authors
              ? authors.map((author, index) => <p key={index}>{author}</p>)
              : "-"}
          </BookAuthor>
          <BookInfo>
            {book.publishedDate ? (
              <BookPublishDate>
                Publish:
                <p>{format(parseISO(book.publishedDate), "MMM dd yyyy")}</p>
              </BookPublishDate>
            ) : (
              "-"
            )}
            <BookmarkButton onClick={handleBookmark}>
              {book.isBookmark ? (
                <FaTimes size="1.6em" color="white" />
              ) : (
                <FaBook size="1.6em" color="white" />
              )}
            </BookmarkButton>
          </BookInfo>
          <BookLink href={book.infoLink} target="_blank">
            <h3>Link Store</h3>
          </BookLink>
        </BookDetail>
      </BookHeader>
      <BookDescription>{ReactHtmlParser(book.description)}</BookDescription>
    </Wrapper>
  );
};

export { BookScreen };
