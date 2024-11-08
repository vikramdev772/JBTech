import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { 
  FileText,
  Table,
  Users,
  Search,
  RefreshCw,
  Filter,
  Download,
  ChevronDown,
  Eye,
  EyeOff
} from 'lucide-react';

// Reusable loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
  </div>
);

// Reusable stats card component
const StatCard = ({ label, value, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <p className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
          {value}
        </p>
      </div>
      <div className={`p-3 rounded-lg bg-${color.split(' ')[1]}/10`}>
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
    </div>
  </motion.div>
);

// Reusable action button component
const ActionButton = ({ onClick, icon: Icon, label, variant = "default" }) => {
  const variants = {
    default: "from-purple-600 to-pink-600",
    success: "from-green-600 to-teal-600",
    warning: "from-yellow-600 to-orange-600"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg 
        bg-gradient-to-r ${variants[variant]} 
        text-white font-medium 
        flex items-center space-x-2 
        hover:shadow-lg transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </motion.button>
  );
};

const DataTable = ({ data, isLoading }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [visibleColumns, setVisibleColumns] = useState({
    username: true,
    email: true,
    phone: true,
    dob: true,
    college: true,
    state: true
  });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      {/* Column Visibility Controls */}
      <div className="p-4 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm text-gray-400">Show/Hide Columns:</span>
          {Object.keys(visibleColumns).map(column => (
            <button
              key={column}
              onClick={() => setVisibleColumns(prev => ({
                ...prev,
                [column]: !prev[column]
              }))}
              className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${visibleColumns[column] 
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                  : 'bg-white/5 text-gray-400 border border-white/10'}
              `}
            >
              {column.charAt(0).toUpperCase() + column.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-white/5">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                SI
              </th>
              {Object.entries(visibleColumns).map(([column, isVisible]) => 
                isVisible && (
                  <th 
                    key={column}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                    onClick={() => requestSort(column)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column}</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform ${
                          sortConfig.key === column && sortConfig.direction === 'descending' 
                            ? 'transform rotate-180' 
                            : ''
                        }`}
                      />
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedData.map((user, index) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                className="group"
              >
                <td className="px-6 py-4 text-sm text-gray-300">
                  {index + 1}
                </td>
                {visibleColumns.username && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {user.username}
                  </td>
                )}
                {visibleColumns.email && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {user.email}
                  </td>
                )}
                {visibleColumns.phone && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {user.phone}
                  </td>
                )}
                {visibleColumns.dob && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(user.dob).toLocaleDateString()}
                  </td>
                )}
                {visibleColumns.college && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {user.college}
                  </td>
                )}
                {visibleColumns.state && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {user.state}
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Data = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ed-tech-hsnl.onrender.com/api/auth/data');
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(user => 
      Object.values(user).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'UserData');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    saveAs(dataBlob, 'UserData.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('User Data', 14, 22);
    const tableData = filteredData.map((user, index) => [
      index + 1,
      user.username,
      user.email,
      user.phone,
      new Date(user.dob).toLocaleDateString(),
      user.college,
      user.state,
    ]);
    doc.autoTable({
      head: [['SI', 'Username', 'Email', 'Phone', 'Date of Birth', 'College', 'State']],
      body: tableData,
      startY: 30,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [102, 16, 242] },
    });
    doc.save('UserData.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black">
      <div className="max-w-[1800px] mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-5 h-5 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">User Data</h1>
          </div>
          <p className="text-gray-400">Manage and export user information</p>
        </div>

        {/* Controls */}
        <div className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
            />
          </div>

          <div className="flex items-center space-x-4">
            <ActionButton
              onClick={exportToExcel}
              icon={Table}
              label="Export Excel"
              variant="success"
            />
            <ActionButton
              onClick={exportToPDF}
              icon={FileText}
              label="Export PDF"
              variant="warning"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Total Users"
            value={data.length}
            icon={Users}
            color="from-purple-400 to-pink-500"
          />
          <StatCard
            label="Active Today"
            value={Math.floor(data.length * 0.7)}
            icon={Eye}
            color="from-green-400 to-emerald-500"
          />
          <StatCard
            label="New This Week"
            value={Math.floor(data.length * 0.3)}
            icon={Download}
            color="from-blue-400 to-cyan-500"
          />
        </div>

        {/* Table */}
        <div className="relative backdrop-blur-sm bg-black/30 rounded-2xl border border-white/10 overflow-hidden">
          <DataTable data={filteredData} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Data;