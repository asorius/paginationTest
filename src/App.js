import React, { Component } from 'react';
import Pagination from './Pagination';
export default class App extends Component {
  state = {
    posts: [],
    currentPage: 1,
    postsToDisplay: 10,
    displayPosts: []
  };
  componentDidMount() {
    const getPosts = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      //sets state only once, on iniatial mount
      this.setState({
        ...this.state,
        posts: data,
        displayPosts: data.slice(
          this.state.currentPage * this.state.postsToDisplay -
            this.state.postsToDisplay,
          this.state.postsToDisplay * this.state.currentPage
        )
      });
    };
    getPosts();
  }
  componentDidUpdate(preProps, prevState) {
    //if user requested page change, pagination func updates currentpage in state, invoking compdidUpdate,recalculating displayposts to display
    if (prevState.currentPage !== this.state.currentPage) {
      // if currentpage is 1 and we chose to display 5 post per page , then slice from 1*5-5=0 ,if current is 2 , then 2*5-5=5
      const fromThisIndex =
        this.state.currentPage * this.state.postsToDisplay -
        this.state.postsToDisplay;
      // if currentpage is 1 and we chose to display 5 post per page , then slice upto index 1*5=5 ,if current is 2 , then 2*5=10
      const toThisIndex = this.state.postsToDisplay * this.state.currentPage;
      this.setState({
        ...this.state,
        displayPosts: this.state.posts.slice(fromThisIndex, toThisIndex)
      });
    }
  }
  paginationFunc = pageNumber => {
    //pagenumber to update to is transfered through a callback from pagination component and state is updated
    this.setState({ ...this.state, currentPage: pageNumber });
  };

  render() {
    const posts = this.state.displayPosts;
    return (
      <div>
        <h1>Pagination test</h1>
        <ul>
          {posts.map(post => {
            return <li key={post.id}>{post.title}</li>;
          })}
        </ul>
        <Pagination
          paginationFunc={this.paginationFunc}
          posts={this.state.posts}
          step={this.state.postsToDisplay}
        />
      </div>
    );
  }
}
