import React, {useState} from "react";

import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	Switch,
	Alert
} from "react-native";

import {Ionicons} from "@expo/vector-icons";

import styles from "./styles";
import Button from "../../components/Button";
import {colors} from "../../theme";

export default function Profile({navigation}){
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);
	const [marketingEnabled, setMarketingEnabled] = useState(false);

	function handleLogout(){
		Alert.alert("Log out","Are you sure you want to log out?",[
			{text:'Cancel',style:'cancel'},
			{text:'Log out',style:'destructive',onPress:()=>navigation.navigate('Login')}
		]);
	}

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{paddingBottom:40}}>

				<View style={styles.header}>
					<TouchableOpacity onPress={()=>navigation.goBack()}>
						<Ionicons name="chevron-back" size={26} color={colors.text} />
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Profile</Text>
					<TouchableOpacity onPress={()=>navigation.navigate('EditProfile')}>
						<Ionicons name="create-outline" size={20} color={colors.text} />
					</TouchableOpacity>
				</View>

				<View style={styles.profileCard}>
					<Image source={{uri:'https://i.pravatar.cc/150?img=12'}} style={styles.avatar} />
					<View style={styles.profileInfo}>
						<Text style={styles.name}>Imara</Text>
						<Text style={styles.email}>imara@example.com</Text>
						<TouchableOpacity style={styles.editRow} onPress={()=>navigation.navigate('EditProfile')}>
							<Ionicons name="pencil" size={14} color={colors.primary} />
							<Text style={styles.editText}> Edit profile</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Account</Text>
					<TouchableOpacity style={styles.row} onPress={()=>navigation.navigate('ChangePassword')}>
						<View style={styles.rowLeft}>
							<Ionicons name="key-outline" size={20} color={colors.primary} />
							<Text style={styles.rowText}> Change Password</Text>
						</View>
						<Ionicons name="chevron-forward" size={20} color={colors.gray} />
					</TouchableOpacity>

					<TouchableOpacity style={styles.row} onPress={()=>navigation.navigate('ConnectedDevices')}>
						<View style={styles.rowLeft}>
							<Ionicons name="phone-portrait-outline" size={20} color={colors.primary} />
							<Text style={styles.rowText}> Connected Devices</Text>
						</View>
						<Ionicons name="chevron-forward" size={20} color={colors.gray} />
					</TouchableOpacity>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Notifications</Text>
					<View style={styles.row}>
						<View style={styles.rowLeft}>
							<Ionicons name="notifications-outline" size={20} color={colors.primary} />
							<Text style={styles.rowText}> App notifications</Text>
						</View>
						<Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
					</View>

					<View style={styles.row}>
						<View style={styles.rowLeft}>
							<Ionicons name="mail-outline" size={20} color={colors.primary} />
							<Text style={styles.rowText}> Marketing emails</Text>
						</View>
						<Switch value={marketingEnabled} onValueChange={setMarketingEnabled} />
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Privacy & Security</Text>
					<TouchableOpacity style={styles.row} onPress={()=>navigation.navigate('Privacy')}>
						<View style={styles.rowLeft}>
							<Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
							<Text style={styles.rowText}> Privacy</Text>
						</View>
						<Ionicons name="chevron-forward" size={20} color={colors.gray} />
					</TouchableOpacity>

					<TouchableOpacity style={styles.row} onPress={()=>navigation.navigate('NotificationSettings')}>
						<View style={styles.rowLeft}>
							<Ionicons name="bell-outline" size={20} color={colors.primary} />
							<Text style={styles.rowText}> Notification settings</Text>
						</View>
						<Ionicons name="chevron-forward" size={20} color={colors.gray} />
					</TouchableOpacity>
				</View>

				<View style={styles.footer}>
					<Button title="Log out" onPress={handleLogout} />
				</View>

			</ScrollView>
		</View>
	);

}