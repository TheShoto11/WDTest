import './App.css';
import DataTable from "./components/dataTable";
import users from "./data/users.json";
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <DataTable users={users} />
    </div>
  );
}

export default App;
