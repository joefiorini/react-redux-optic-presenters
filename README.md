# react-redux-presenters
Functional library for separating state &amp; behavior from react components

This library aims to help keep your React components clean by providing a consistent pattern for managing redux `mapStateToProps`/`mapDispatchToProps` boilerplate.

Currently this library only contains a couple primitives, but as we gather more use cases, we will be adding more.

## Presenters

The [presenter pattern](https://martinfowler.com/eaaDev/SupervisingPresenter.html) (also called "supervising controller") abstracts the management of view data & behavior to a separate module. The view itself is responsible for directly responding to user interaction, but it then delegates to the presenter for performing updates based on this interaction. This separation makes complex components easier to understand and makes it easier to test complex logic.

This library implements this pattern for your react components. It is based on, and assumes the use of, [react-redux](/reactjs/react-redux). The presenter will import the `connect` function from react-redux and build the `mapStateToProps` and `mapDispatchToProps` that you would normally do in the component.

### Implementation

The basic implementation, without using this library, looks like:

```javascript
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

export default {
  connect: connect(mapStateToProps, mapDispatchToProps)
};
```

Then you can connect your component to the presenter like so:

```javascript
import React from 'react';
import presenter from './presenter';

function VisibleTodos({ todos, onTodoClick }) {
  return (
    // Markup for Todo list here
  );
}

export default presenter.connect(VisibleTodos);
```

### This Library

So why have a library? 

1. There are a number of different ways to structure data in a redux store. We want to provide abstractions to make creating presenters for these structures easy.
2. Sometimes you may need to reuse the same presenter patterns in multiple presenters; the functional answer to reusability is composition. Therefore, this library provides a helper that allows you create presentational primitives and compose them into a single presenter.

### Contributing

This library currently is very limited. It merely provides the `composePresenters` function and a helper for creating presenters if you use the `normalizer` format of structuring your redux store. If you are interested in helping out with this please drop me a line (I have contact info in my profile) or open an issue/PR explaining your use case and how we might be able to make it easier.
