const React = require("react");
const { render } = require("@testing-library/react");
const App = require("./App").default;
const { getByText } = require("@testing-library/react");

test("renders learn react link", () => {
  render(React.createElement(App));
  let linkElement = getByText(document.body, /learn react/i);
  expect(linkElement).toBeInTheDocument();
});
