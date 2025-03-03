import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)  
  const [code, setCode] = useState('function sum() {\n  return 1 + 1;\n}'); // Initialize as a string
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)  // To manage loading state

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true); // Start the loading process

    try {
      const response = await axios.post('https://code-reviewer-backend-fz5l.onrender.com', { code });
      console.log('API Response:', response);  // Log the full response object

      // Check if the response contains the review property and is a string
      if (response.data && typeof response.data.review === 'string') {
        setReview(response.data.review);  // Set the review string from the response
      } else {
        console.error('Invalid review data received:', response.data);
        setReview('Error: Invalid review data');  // Show error if data is not as expected
      }

    } catch (error) {
      console.error('Error during review:', error);
      setReview('Error: Could not fetch review.');
    }

    setCount(prevCount => prevCount + 1); // Increment review count
    setLoading(false); // End the loading process
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => {
                if (typeof code !== 'string') {
                  console.error('Expected a string but received:', code);
                  return code; // Handle the error
                }
                return prism.highlight(code, prism.languages.javascript, "javascript");
              }}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            {loading ? "Reviewing..." : "Review"}
          </div>
          <div>Review Clicked: {count} times</div> {/* Display the count */}
        </div>
        <div className="right">
          {/* Render review content or error/loading message */}
          {review ? (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          ) : (
            <p>{loading ? "Loading review..." : "No review available"}</p>
          )}
        </div>
      </main>
    </>
  )
}

export default App


