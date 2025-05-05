import { StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flex: 1,
    padding: SIZES.screenPadding,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  subheading: {
    fontSize: SIZES.large,
    color: COLORS.textLight,
    marginBottom: SIZES.medium,
  },
  paragraph: {
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    ...SHADOWS.small,
  },
  button: {
    height: SIZES.buttonHeight,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.large,
    ...SHADOWS.small,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonSecondary: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  textButton: {
    padding: SIZES.base,
  },
  textButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.font,
    fontWeight: '600',
  },
  input: {
    height: SIZES.inputHeight,
    borderWidth: 1,
    borderColor: COLORS.textLight,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SIZES.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    marginBottom: SIZES.medium,
  },
  error: {
    color: COLORS.error,
    fontSize: SIZES.small,
    marginBottom: SIZES.small,
  },
  shadow: SHADOWS.small,
}); 