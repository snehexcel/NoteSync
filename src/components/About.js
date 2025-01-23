// Import necessary React components
import React from 'react';
import background1 from "../images/Slogo.png"


// Create functional component for the About Me page
const AboutMe = () => {
  return (
    <div className="container text-center" >
      <h1 style={{ "fontFamily": "sans-serif", color: "white" }}>📖<b><u>NoteSync - Keep your notes secure on cloud!</u></b></h1>
      <div className="container mt-4" >
        <div className="row">
          <div className="about-me-container">
            {/* Photo on the left side */}
            <div className="photo-container">
              <img
                src={background1}
                alt="Your Name"
                className="img-fluid"
              />
            </div>

            {/* Text content on the right side */}
            <div className="text-container text-center">
              <div className='container'>
              <h1 style={{ "fontFamily": "cursive", color: "#900C3F" }}>   Hi, Myself Sneha Kumari.</h1>
              <p style={{ "fontFamily": "cursive", color: "#EAB2A0" }}><h5>Web Developer, Programmer and Painter</h5><p><h5>Having knowledge of programming languages C,JAVA and Python and also of technologies like: React.Js, Express.Js, Node.Js, Next.Js, MongoDB, JavaScript, HTML and CSS.</h5></p></p>
              </div>
              <div className="container text-center">
                <div className='my-5'>
                  <p>
                    <h2 style={{ "fontFamily": "cursive", color: "#A76F6F" }}>WELCOME TO NoteSync</h2>
                    <p style={{ "fontFamily": "cursive", color: "#EAB2A0" }}><h6>Worried where to keep your notes secure and safe? I have got you covered. Signup and keep all your notes in the cloud. <b>Easy to access!</b> NoteSync is my attempt to keep all your notes secure and private from others.</h6></p>
                  </p>
                </div>
                <div className='container'>
                  <p>
                    <h2 style={{ "fontFamily": "cursive", color: "#A76F6F" }}>About Website</h2>
                    <p style={{ "fontFamily": "cursive", color: "#EAB2A0" }}><h6><i><b>NoteSync - Keep your notes secure</b></i> is a user-friendly web application designed for convenient note-taking. It incorporates a secure user authentication system, allowing users to easily manage their notes, ensuring that their thoughts and ideas are captured, edited, and accessible anytime, anywhere. Users have the flexibility to edit existing notes and delete ones they no longer require. This platform offers a seamless experience for efficient note-taking and organization.
                    </h6></p>
                  </p>
                  <p style={{ "fontFamily": "cursive", color: "#EAB2A0" }}>NoteSync is constructed utilizing a diverse range of technologies, incorporating both frontend and backend components.
                  </p>
                  <p style={{ "fontFamily": "cursive", color: "#EAB2A0" }}>On the frontend, we leverage React to craft a dynamic and user-friendly interface. React Router is employed for seamless navigation, ensuring an intuitive user experience. Additionally, Bootstrap CSS and JavaScript contribute to the application's responsiveness and visually appealing styling.</p>
                  <p style={{ "fontFamily": "cursive", color: "#EAB2A0" }}>Moving to the backend, we utilize Node.js in conjunction with Express to facilitate API development. This combination allows for robust and efficient server-side processes. For data storage, MongoDB is employed, providing a reliable and scalable database solution.</p>
                  <p style={{ "fontFamily": "cursive", color: "#EAB2A0" }}>Ensuring secure authentication, NoteSync implements JSON Web Tokens (JWT). This authentication mechanism adds an extra layer of protection, enhancing the overall security of the application.</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
