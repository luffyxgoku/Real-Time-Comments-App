import { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";
import "./comment.css";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";

const Comment = () => {
  const [username, setUsername] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const socket = useContext(SocketContext);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/comments");
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();

    if (socket) {
      socket.on("newComment", (comment) => {
        setComments((prevComments) => {
          if (!prevComments.some((c) => c.id === comment.id)) {
            return [...prevComments, comment];
          }
          return prevComments;
        });
      });
    }

    return () => {
      if (socket) {
        socket.off("newComment");
      }
    };
  }, [socket]);

  const handleSendComment = async () => {
    if (newComment.trim()) {
      const commentData = {
        username,
        comment: newComment,
        timestamp: new Date().toISOString(),
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/comments",
          commentData
        );
        socket.emit("sendComment", response.data);
        setNewComment("");
      } catch (error) {
        console.error("Error sending comment:", error);
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Box sx={{ padding: 2 }} className="comments-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Comments
      </Typography>
      <List className="comment-lists-container">
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <strong className="usernamestyle">{comment.username} :</strong>{" "}
            <span className="commentstyle">{comment.comment}</span>
            <br />
            <span className="timestamp">
              {formatTimestamp(comment.timestamp)}
            </span>
          </ListItem>
        ))}
      </List>
      <Box
        className="msg-input-container"
        sx={{ display: "flex", marginTop: 2 }}
      >
        <TextField
          label="Type your comment"
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          fullWidth
          sx={{ marginRight: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleSendComment}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Comment;
