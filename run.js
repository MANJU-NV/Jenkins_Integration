const axios = require('axios');
const xlsx = require('xlsx');

// Function to fetch data from the API and write to an Excel file
async function fetchDataAndWriteToExcel() {
  try {
    // Fetch data from the API
    const response = await axios.get('https://reqres.in/api/users?page=2');
    const users = response.data.data;

    // Extract id, first_name, and email from the API response
    const extractedData = users.map(user => ({
      id: user.id,
      first_name: user.first_name,
      email: user.email // Now we correctly map the email from the API response
    }));

    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(extractedData, {header: ['id', 'first_name', 'email']});

    // Append the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Users');

    // Write the Excel file
    xlsx.writeFile(workbook, 'users_data_with_email.xlsx');

    console.log('Excel file created successfully with email data!');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the function to fetch data and write to Excel
fetchDataAndWriteToExcel();
