import { ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
}

function MovieSearchForm({ children }: MyComponentProps) {
  return <header>{children}</header>;
}

export default MovieSearchForm;
