import React, { useState, useEffect } from "react";
import { Accordion, Badge, Button, Card, Modal } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import './Mynotes.css';  // Import custom CSS for styling

function MyNotes({ search }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const ModelShow = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedNote(null);
  };

  return (
    <MainScreen title={`Welcome ${userInfo && userInfo.name}..`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes &&
        notes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note) => (
            <Accordion key={note._id}>
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    onClick={() => ModelShow(note)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: "1",
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: "18px",
                    }}
                  >
                    {note.title}
                  </span>
                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge bg="success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on <cite title="Source Title">{note.createdAt.substring(0, 10)}</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
      {/* Modal Component */}
      {selectedNote && (
        <Modal
          show={showModal}
          onHide={handleClose}
          dialogClassName="custom-modal"
          className="modal-custom"
        >
          <Modal.Header>
            <Modal.Title>{selectedNote.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>
              <Badge bg="success">Category - {selectedNote.category}</Badge>
            </h4>
            <ReactMarkdown>{selectedNote.content}</ReactMarkdown>
            <footer className="blockquote-footer">
              Created on <cite title="Source Title">{selectedNote.createdAt.substring(0, 10)}</cite>
            </footer>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </MainScreen>
  );
}

export default MyNotes;
