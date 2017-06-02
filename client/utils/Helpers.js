export default {
  readDate: (dataString) => {
    const dateInstance = new Date(dataString);
    return dateInstance.toDateString();
  },
  getRoleName: (roleId) => {
    switch (roleId) {
      case 1:
        return 'Superadmin';
      case 2:
        return 'Admin';
      default: return 'Regular';
    }
  },
  countUserDocuments: (documents, userId) => {
    return documents.rows
      .filter(document => document.ownerID === userId)
        .length;
  },
  saveToLocalStorage: (token, userId, roleId) => {
    localStorage.setItem('hermesToken', token);
    localStorage.setItem('hermesuserId', userId);
    localStorage.setItem('hermesroleId', roleId);
  }
}
