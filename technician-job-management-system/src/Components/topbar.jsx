
function Topbar({ pageTitle }) {

  return (
    <header className="topbar">

      <div>
        <p className="breadcrumb">
          Workspace / {pageTitle}
        </p>
      </div>

      <div className="topbar-right">

        <button className="notification-btn">
          ♧ Notifications
        </button>

        <div className="topbar-user">
          <div className="avatar">AD</div>

          <div>
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Topbar;
