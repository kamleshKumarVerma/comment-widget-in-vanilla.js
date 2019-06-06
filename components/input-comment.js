const inputComment = {
	create: (container, callBack, isInputRemoveAfterUse) => {
		let input = document.createElement("input");
		input.type = "text";
		input.classList.add("input-comment");
		input.setAttribute("placeholder", "Enter your comment!");
		input.onchange = function(event) {
			callBack(this.value);
			this.value = "";
			if(isInputRemoveAfterUse) {
				event.target.remove()
			}
		}
		container.appendChild(input);
	}
}

export default inputComment;