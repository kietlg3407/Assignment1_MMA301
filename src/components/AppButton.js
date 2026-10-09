
import React from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
} from 'react-native';

export default function AppButton({
    title,
    onPress,
    variant = 'primary',
    style,
    disabled = false,
}) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                styles[variant],
                pressed && !disabled && styles.pressed,
                disabled && styles.disabled,
                style,
            ]}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 13,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    primary: {
        backgroundColor: '#3157D5',
    },
    secondary: {
        backgroundColor: '#64748B',
    },
    danger: {
        backgroundColor: '#DC2626',
    },
    pressed: {
        opacity: 0.75,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
});