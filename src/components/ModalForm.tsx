import { FormProject } from "./Proyects/FormProject";

type ModalFormProps = {
  idModal: string;
};

const ModalForm = ({ idModal }: ModalFormProps) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${idModal}`}
      >
        Nuevo proyecto
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
                Nuevo Proyecto
              </h1>
            </div>
            <FormProject />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalForm;
