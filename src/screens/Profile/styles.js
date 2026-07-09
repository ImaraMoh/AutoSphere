import {StyleSheet} from 'react-native';
import {colors, fonts, spacing} from '../../theme';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		padding: 20,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '700',
		color: colors.text,
	},
	profileCard: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.white,
		padding: 16,
		borderRadius: 14,
		shadowColor: '#000',
		shadowOpacity: 0.04,
		shadowRadius: 8,
		elevation: 2,
		marginBottom: 18,
	},
	avatar: {
		width: 72,
		height: 72,
		borderRadius: 40,
		marginRight: 14,
	},
	profileInfo: {
		flex: 1,
	},
	name: {
		fontSize: 18,
		fontWeight: '700',
		color: colors.text,
	},
	email: {
		color: colors.gray,
		marginTop: 6,
	},
	editRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 8,
	},
	editText: {
		color: colors.primary,
		marginLeft: 8,
		fontWeight: '600',
	},
	section: {
		marginTop: 8,
		backgroundColor: 'transparent',
		marginBottom: 6,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: '700',
		color: colors.gray,
		marginBottom: 8,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: colors.white,
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderRadius: 12,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: colors.border,
	},
	rowLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rowText: {
		marginLeft: 12,
		fontSize: 16,
		color: colors.text,
	},
	footer: {
		marginTop: 20,
		paddingHorizontal: 4,
	}
});
