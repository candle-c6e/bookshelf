import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { BookRow } from "../components/BookRow";
import { Input } from "../components/Lib";
import { useBookSearch } from "../utils/books";
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

function HomeScreen() {
  const history = useHistory();
  const location = useLocation();

  const queryString = location.search.split("=")[1] || "react";

  const [query, setQuery] = useState<string>(queryString);
  const { isLoading, data: books } = useBookSearch(query);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const value = event.target.elements.query.value;
    setQuery(value);

    history.push(value ? `?search=${value}` : `/discover`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input type="text" defaultValue={queryString} id="query" />
      </form>
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

export { HomeScreen };
