import inputComment from "./components/input-comment.js";
import CommentList from "./components/comment-list.js";

class Main {
	constructor() {
		inputComment.create(document.getElementById("input-comment-container"), this.onCommentAdded.bind(this));
		this.commentList = new CommentList();
		this.container = document.getElementById("comments-container");
	}

	onCommentAdded(data) {
		const commentObj = {
			text: data,
			createdAt: new Date(),
			postedBy: "Anonymous"
		};
		this.commentList.addComment(this.container, commentObj, "insertBefore");
	}
}

let main = new Main();