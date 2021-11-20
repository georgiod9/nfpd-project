const { default: Home } = require(".");

ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );