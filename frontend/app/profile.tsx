import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, ChevronRight, Mail, Phone, MapPin, LogOut } from 'lucide-react-native';

const Profile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header: Foto y Nombre */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' }} 
          style={styles.avatar} 
        />
        <Text style={styles.name}>Alex Rivera</Text>
        <Text style={styles.bio}>Product Designer & Coffee Lover</Text>
      </View>

      {/* Estadísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Proyectos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>1.2k</Text>
          <Text style={styles.statLabel}>Seguidores</Text>
        </View>
      </View>

      {/* Lista de Opciones */}
      <View style={styles.menuContainer}>
        <MenuItem icon={<Mail size={20} color="#666" />} title="Correo" value="alex@example.com" />
        <MenuItem icon={<Phone size={20} color="#666" />} title="Teléfono" value="+1 234 567 890" />
        <MenuItem icon={<MapPin size={20} color="#666" />} title="Ubicación" value="Madrid, ES" />
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Subcomponente para las filas del menú
const MenuItem = ({ icon, title, value }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuItemLeft}>
      {icon}
      <Text style={styles.menuItemTitle}>{title}</Text>
    </View>
    <View style={styles.menuItemRight}>
      <Text style={styles.menuItemValue}>{value}</Text>
      <ChevronRight size={18} color="#CCC" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { alignItems: 'center', paddingVertical: 30, backgroundColor: '#FFF' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
  bio: { fontSize: 14, color: '#666', marginTop: 5 },
  statsContainer: { flexDirection: 'row', backgroundColor: '#FFF', paddingBottom: 20, justifyContent: 'space-around' },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  statLabel: { fontSize: 12, color: '#888' },
  menuContainer: { marginTop: 20, backgroundColor: '#FFF', paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#EEE' },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemTitle: { marginLeft: 15, fontSize: 16, color: '#333' },
  menuItemRight: { flexDirection: 'row', alignItems: 'center' },
  menuItemValue: { marginRight: 10, color: '#888', fontSize: 14 },
  divider: { height: 20 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 },
  logoutText: { marginLeft: 10, color: '#FF3B30', fontWeight: '600', fontSize: 16 }
});

export default Profile;