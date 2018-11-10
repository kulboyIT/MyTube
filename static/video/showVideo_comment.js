

window.addEventListener("keyup", (event) => {
	if (event.key == "Enter") {
		if (document.getElementById("new_comment") == document.activeElement){
			var comment;
			total_comments = document.getElementById("total_comments").innerHTML;
			api = "http://localhost:8000/api"
			content = document.getElementById("new_comment").value; //document.getElementById("new_comment").value;
			userProfile_id = 1//document.getElementByIde("userProfile_id").value;
			video_id = 1//document.getElementByIde("userProfile_id").value;
			data = {"content":content,
					"user_profile":`${api}/user_profiles/${userProfile_id}/`,
					"video":`${api}/videos/${video_id}/`}
			csrftoken = Cookies.get("csrftoken")
			fetch("/api/comments/?format=json",{
				method: "POST",
				headers: {
				    'Accept': 'application/json, text/plain, */*',
				    'Content-Type': 'application/json',
					"X-CSRFToken":csrftoken
				},
				body: JSON.stringify(data)
			}).then(function (response){
				return response.json();
			}).then(function (json){
				comment = json
			}).then(function(json){
				fetch(comment.user_profile,{
					method: "GET",
					headers: {
						"Accept": "application/json, text/plain, */*",
						"Content-Type": "application/json",
						"X-CSRFToken":csrftoken
					},
				}).then(function(response){
					return response.json();
				}).then(function(json){
					insertComment(document.getElementById("comments"),
									htmlComment(comment.id,comment.content,json.photo,
									comment.firstname,comment.lastname,0));
					total_comments = String(Number(total_comments) + 1); 
					document.getElementById("total_comments").innerHTML = total_comments;
				})
			})
			document.getElementById("new_comment").value = "";	
		}
	}
})


function insertComment(div,html){
	div.innerHTML = html + div.innerHTML;
}

function htmlComment(id,content,photo_url,firstname,lastname,likes){
	return commentHTML = `
	 <div class="new_comment" id="commentId=${id}">

										<!-- build comment -->
									 	<ul class="user_comment">

									 		<!-- current #{user} avatar --> 
										 	<!-- start user replies -->
									 	<li>
									 		
									 		<!-- current #{user} avatar -->
										 	<div class="user_avatar">
										 		<img src="${photo_url}">
										 	</div><!-- the comment body --><div class="comment_body">
										 		<p><div class="replied_to">${content}</p>
										 	</div>

										 	<!-- comments toolbar -->
										 	<div class="comment_toolbar">

										 		<!-- inc. date and time -->
										 		<div class="comment_details">
										 			<ul>
										 				<li><i class="fa fa-clock-o"></i> TO:DO</li>
										 				<li><i class="fa fa-calendar"></i>${firstname} ${lastname}</li>
										 				<li><i class="fa fa-pencil"></i> <span class="user">{{co}}</span></li>
										 			</ul>
										 		</div><!-- inc. share/reply and love --><div class="comment_tools">
										 			<ul>
										 				<li><i class="fa fa-share-alt"></i></li>
										 				<li><i class="fa fa-reply"></i></li>
										 				<li><i class="fa fa-heart love"><span class="love_amt"> ${likes}</span></i></li>
										 			</ul>
										 		</div>

										 	</div>


									 	</li>
	`
}