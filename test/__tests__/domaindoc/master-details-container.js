// import 'jest-dom/extend-expect';
// import 'react-testing-library/cleanup-after-each';
// import React from 'react';
// import {render, fireEvent} from 'react-testing-library';
//
// // normally you'd put this logic in your test utility file so it can be used
// // for all of your tests.
// function render(
//   ui,
//   {
//     route = '/',
//     history = createMemoryHistory({initialEntries: [route]}),
//     ...renderOptions
//   } = {},
// ) {
//   return {
//     ...rtlRender(<Router history={history}>{ui}</Router>, renderOptions),
//     // adding `history` to the returned utilities to allow us
//     // to reference it in our tests (just try to avoid using
//     // this to test implementation details).
//     history,
//     store
//   }
// }
//
// test('can', () => {
//   const {getByTestId, getByText} = render(<ConnectedCounter />)
//   fireEvent.click(getByText('+'))
//   expect(getByTestId('count-value')).toHaveTextContent('1')
// })
//
//
// test('schema name prop bound through route', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<FavoriteNumber />, div);
//   const {getByLabelText} = getQueriesForElement(div)
//   const input = getByLabelText(/favorite number/i)
//   expect(input).toHaveAttribute('type', 'number')
// });
//
// // test('entering an invalid value shows an error message', () => {
// //   const {getByLabelText, getByTestId} = render(<FavoriteNumber />)
// //   const input = getByLabelText(/favorite number/i)
// //   fireEvent.change(input, {target: {value: 10}})
// //   expect(getByTestId('error-message')).toHaveTextContent(
// //     /the number is invalid/i,
// //   )
// // })
// //
// // // this is a handy function that I normally make available for all my tests
// // // that deal with connected components.
// // // you can provide initialState or the entire store that the ui is rendered with
// // function render(
// //   ui,
// //   {initialState, store = createStore(reducer, initialState)} = {},
// // ) {
// //   return {
// //     ...rtlRender(<Provider store={store}>{ui}</Provider>),
// //     // adding `store` to the returned utilities to allow us
// //     // to reference it in our tests (just try to avoid using
// //     // this to test implementation details).
// //     store,
// //   }
// // }
// //
// // test('can increment the value', () => {
// //   const {getByTestId, getByText} = render(<ConnectedCounter />)
// //   fireEvent.click(getByText('+'))
// //   expect(getByTestId('count-value')).toHaveTextContent('1')
// // })
// //
// // test('can decrement the value', () => {
// //   const {getByTestId, getByText} = render(<ConnectedCounter />, {
// //     initialState: {count: 3},
// //   })
// //   fireEvent.click(getByText('-'))
// //   expect(getByTestId('count-value')).toHaveTextContent('2')
// // })
