import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ClientType } from '../../pages/Home/types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    display: 'flex',
    width: 'auto',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderBottom: '1px solid #ccc',
  },
  bold: {
    fontWeight: 'bold',
  },
});

interface UserListPDFProps {
  clients: ClientType[];
}

const UserListPDF: React.FC<UserListPDFProps> = ({ clients }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Lista de Clientes</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.bold]}>
            <Text style={styles.tableCell}>Nome</Text>
            <Text style={styles.tableCell}>Telefone</Text>
            <Text style={styles.tableCell}>E-mail</Text>
          </View>
          {clients?.map((client) => (
            <View key={client.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{client.name}</Text>
              <Text style={styles.tableCell}>{client.phone}</Text>
              <Text style={styles.tableCell}>{client.email}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default UserListPDF;