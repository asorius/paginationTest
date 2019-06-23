import React, { Component } from 'react';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: []
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const { posts, step } = this.props;
    const totalPages = posts.length / step;
    if (this.props.posts !== prevProps.posts) {
      let arr = [];
      for (let i = 1; i <= totalPages; i++) {
        arr.push(i);
      }
      this.setState({ ...this.state, pages: arr });
    }
  }
  render() {
    const { paginationFunc } = this.props;

    return (
      <div>
        {this.state.pages.map(pagenumber => {
          return (
            <div
              key={Math.random()}
              style={{ display: 'inline-block', padding: '.5rem' }}
            >
              <a href="!#" onClick={() => paginationFunc(pagenumber)}>
                {pagenumber}
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}
