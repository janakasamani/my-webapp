import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import './Table.css';
import EditIcon from '@mui/icons-material/Edit.js';
import DeleteIcon from '@mui/icons-material/Delete.js';
import { jwtDecode } from "jwt-decode";
const Table = () => {
  const {t, i18n} = useTranslation("common");
  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang === 'Arabic') {
      i18n.changeLanguage('ar')
    } else {
      i18n.changeLanguage('en')
    }
  }, [i18n]);

  const [data, setData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  useEffect(() => {
    getData();
    // addData();
    // editData();
  }, []);

  const getData = () => {
    fetch('https://dummyjson.com/users')
      .then((res) => res.json())
      .then((result) => {
        
        const transformedData = result.users.map((item) => ({
          'firstName': item.firstName,
          'lastName': item.lastName,
          'email': item.email,
          'phone': item.phone,
        }));  
        
        setData(transformedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  
  const addData = () => {
    
  fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: 'jana',
      lastName: 'kasamani',
      email: 'jana.kasamani@hotmail.com',
      phone: 76989536,
    })
    })
    .then(res => res.json())
    .then(newData => {

      setData(transformedData => [...transformedData, newData]);
    });
      }
  const editData = () => {

    fetch('https://dummyjson.com/users/1', {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'iPhone Galaxy +1'
      })
    })
      .then(res => res.json())
      .then(newData => {
  
        setData(transformedData => [...transformedData, newData]);
      });
        }

    const openDeleteConfirmModal = (row) => {
      alert("are you sure you want to delete?")
    };

        
  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'email',
        size: 200,
      },
      {
        accessorKey: 'phone',
        header: 'phone',
        size: 150,
      },
    ],
    [],
  );
  const handleCreateUser = (values) => {
    fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
    })
    }).then(res => {
      console.log('Response Code:', res.status);
      return res.json();
    })
  }
  const handleSaveUser = (values) => {
    fetch('https://dummyjson.com/users/1', {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
      })}).then(res => {
        console.log('Response Code:', res.status);
        return res.json();
      })
      .then(console.log);
  }
  const table = useMaterialReactTable({
    columns,
    data,
    enableFullScreenToggle: false,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    deleteDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: {
          color: 'error',
          children: 'Error loading data',
        }
      ,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
    
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ), 
    renderRowActions: ({ row, table }) => {
      const AccessToken = localStorage.getItem('accessToken');
      const decoded = jwtDecode(AccessToken);
      if (decoded.role === 'admin') {
        return(
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
        );
      } else {

        return null;
      }
    },
    renderTopToolbarCustomActions: ({ table }) => {
      const AccessToken = localStorage.getItem('accessToken');
      const decoded = jwtDecode(AccessToken);
      if (decoded.role === 'admin') {
        return (
          
          <Button 
            variant="contained"
            onClick={() => {
              table.setCreatingRow(true); // Open the create row modal
            }}
          >
            {t('Users.Name')}
          </Button>
        );
      } else {
        return null;
      }
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
