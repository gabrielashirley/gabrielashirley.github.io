const React = require("react");

exports.onRenderBody = ({ setPostBodyComponents }) => {
    setPostBodyComponents([
      <script data-name="BMC-Widget" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="gabrielashirley" data-description="100% of all proceeds go to charity 😇" data-message="Thanks for visiting my website! Let's donate with me😄" data-color="#FF5F5F" data-position="right" data-x_margin="18" data-y_margin="18" />
    ]);
};