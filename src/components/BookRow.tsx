import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Book } from "../utils/types";
import BookPlaceholder from "../assets/book-placeholder.svg";

interface Props {
  book: Book;
}

const Wrapper = styled.div`
  margin-bottom: var(--space-base);
`;

const BookWrapper = styled(Link)`
  display: grid;
  grid-template-columns: 10rem 1fr;
  grid-gap: calc(var(--space-base) * 2);
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 15rem;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const BookInfo = styled.div`
  p {
    margin-top: var(--space-base);
  }
`;

function BookRow({ book }: Props) {
  const authors = book?.authors?.split(",");

  return (
    <Wrapper>
      <BookWrapper to={`/book/${book.id}`}>
        <ImageWrapper>
          <Img
            src={book.thumbnail ? book.thumbnail : BookPlaceholder}
            alt={book.title}
          />
        </ImageWrapper>
        <BookInfo>
          <h4>{book.title}</h4>
          {authors
            ? authors.map((author) => <p key={author}>{author}</p>)
            : "-"}
        </BookInfo>
      </BookWrapper>
    </Wrapper>
  );
}

export { BookRow };
