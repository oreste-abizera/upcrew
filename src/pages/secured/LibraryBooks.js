import React from "react"
import styled from "styled-components"
import { UserContext } from "../../context/UserContext"

export default function LibraryBooks() {
    const { sidebarOpen } = React.useContext(UserContext)
    return <LibraryBooksWrapper sidebarOpen={sidebarOpen}>
        hello from Library Books
    </LibraryBooksWrapper>
}


const LibraryBooksWrapper = styled.div`
@media screen and (min-width: 786px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`