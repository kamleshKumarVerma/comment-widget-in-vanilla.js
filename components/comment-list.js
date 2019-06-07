import TimeFormatter from "./time-formatter.js"
import inputComment from "./input-comment.js";

class CommentList {

	constructor() {
		this.uniqueId = 0;
		this.onEvent();
	}

	onEvent() {
		document.getElementById("comments-container").addEventListener("click", (event) => {
			switch(event.target.className) {
				case "delete-button":
					event.target.parentNode.parentNode.remove();
					break;
				case "reply-button":
					event.target.classList.toggle("hidden");
					inputComment.create(event.target.parentNode, (value) => {
						const commentObj = {
							text: value,
							createdAt: new Date(),
							postedBy: "Anonymous"
						};
						event.target.classList.toggle("hidden");
						this.addComment(event.target.parentNode, commentObj, "appendChild")
					}, true);
				default:
					return;
			}
		});
	}

	addComment(container, commentObj, position) {
		let div = document.createElement("div");
		div.innerHTML = this.constructCommentList(commentObj);
		this.renderComment(container, div, position);
	}

	renderComment(parent, commentNode, position) {
		if(position === "appendChild") {
			parent.appendChild(commentNode);
		} else {
			parent.insertBefore(commentNode, parent.firstChild);
		}
	}

	constructCommentList(commentObj) {
		this.uniqueId++;
		((uniqueId) => {
			let interval = setInterval( () => {
				var span = document.getElementById(`${uniqueId + '-time'}`);
				if(span) {
					span.innerHTML = `${TimeFormatter(commentObj.createdAt)} ago`;
				} else {
					clearInterval(interval);
					/* 
						If element in not present on the DOM
						just clear the interval so that no memory
						leak will be happened.
					*/
				}
			}, 5000);
		})(this.uniqueId);
		return `
			<div class="white-box">
		      <label class="comment-user"> ${commentObj.postedBy} </label>
		      <button class="delete-button">X</button>
		      <div class="text-align">
		         <div class="comment-text"> ${commentObj.text} </div>
		         <span class="time" id="${this.uniqueId + '-time'}">${TimeFormatter(commentObj.createdAt)} ago</span>
		         <button class="reply-button">Reply</button>
		      </div>
		      <div id="replyTemplate"></div>
		   </div>
		`;
	}
}

export default CommentList;