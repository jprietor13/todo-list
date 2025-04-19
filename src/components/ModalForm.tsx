import { ModalFormProps } from "../typings/global";

const ModalForm = ({ idModal, children, title }: ModalFormProps) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${idModal}`}
      >
        <i
          className="bi bi-plus-square pr-4"
          style={{ paddingRight: "4px" }}
        ></i>
        {title}
      </button>

      <div
        className="modal fade"
        id={idModal}
        aria-labelledby="modalForm"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalForm">
                {title}
              </h1>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalForm;
