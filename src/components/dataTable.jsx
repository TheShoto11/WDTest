import  { useState, useMemo } from "react";

const DataTable = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState(""); //to store the search term
  const [sortColumn, setSortColumn] = useState(null);//going to sort through the respective colomns
  const [sortDirection, setSortDirection] = useState("asc");//the direction of sorting for the colomns
  const [currentPage, setCurrentPage] = useState(1);//pagination

  const itemsPerPage = 5;   

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }; //toggle asc or desc through clicking colon

  const filteredData = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]); //filtering users by search term

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]); // sorting users based on the column and order

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]); //the starting index and taking only 5 users per page

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);//how many pages are needed

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Enter name"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); 
        }} // updating search term
        className="mb-4 p-2 border rounded w-full"
      />

      <table className="w-full border border-collapse">
        <thead>
           <tr className="bg-gray-100">{/* making the headers sortable */}
            <th onClick={() => handleSort("name")} className="cursor-pointer p-2">Name</th>
            <th onClick={() => handleSort("email")} className="cursor-pointer p-2">Email</th>
            <th onClick={() => handleSort("phone")} className="cursor-pointer p-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.phone}</td>
            </tr> 
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center space-x-2">
        {/* going forward and back dynamic buttons  */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;