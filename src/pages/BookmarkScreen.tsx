import styled from "@emotion/styled";
import { BookRow } from "../components/BookRow";
import { useBookmark } from "../utils/books";
import { ReactComponent as BookPlaceholder } from "../assets/book-placeholder.svg";

const Wrapper = styled.div`
  margin-top: var(--space-base);
`;

const PlaceholderWrapper = styled.div`
  margin-bottom: var(--space-base);
  display: grid;
  grid-template-columns: 1fr 2fr;

  svg {
    width: 160px;
    max-width: 160px;
  }
`;

function BookmarkScreen() {
  const { isLoading, data: books } = useBookmark();

  return (
    <div>
      <Wrapper>
        {isLoading ? (
          Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).map((_, index) => (
            <PlaceholderWrapper key={index}>
              <BookPlaceholder />
              <p>Loading...</p>
            </PlaceholderWrapper>
          ))
        ) : books.data.length ? (
          books?.data.map((book: any) => <BookRow book={book} key={book.id} />)
        ) : (
          <h2>Not found.</h2>
        )}
      </Wrapper>
    </div>
  );
}

export { BookmarkScreen };
