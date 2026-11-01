
function StatCard({ title, value, icon, description }) {

  return (
    <div className="stat-card">

      <div className="stat-header">
        <span>{title}</span>
        <span className="stat-icon">{icon}</span>
      </div>

      <h2>{value}</h2>

      <p>{description}</p>

    </div>
  );
}

export default StatCard;
