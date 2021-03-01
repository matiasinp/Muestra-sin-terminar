import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			if (window.location.hash) {
				let element = document.getElementById(window.location.hash.substring(1));
				if (element == null) {
					window.location.pathname = "/";
				} else {
					setTimeout(() => {
						window.scrollTo(0, element.offsetTop - 110);
					}, 1);
				}
			} else {
				window.scrollTo(0, 0);
			}
		}
	}

	render() {
		return <React.Fragment />
	}
}

export default withRouter(ScrollToTop)

/*
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
		if (window.location.hash) {
			console.log(window.location.hash)
			let element = document.getElementById(window.location.hash.substring(1));
				setTimeout(() => {
					window.scrollTo(0, element.offsetTop - 110);
				}, 1);
		}
		else {
			window.scrollTo(0, 0);
		}

  }, [pathname]);

  return null;
}
*/
