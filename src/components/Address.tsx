import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from 'theme/colors';
import { TypographyStyles } from 'theme/typography';
import { CommonStyles } from 'theme/common.styles';

export interface IAddressData {
    id: string;
    name?: string;
    address?: string;
    onSave: (name: string, address: string) => void;
    selected?: boolean;
    onSelect?: () => void;
}

export const Address: React.FC<IAddressData> = ({ name, address, onSave, selected, onSelect }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editableName, setEditableName] = useState(name || '');
    const [editableAddress, setEditableAddress] = useState(address || '');

    const handleSave = () => {
        onSave(editableName, editableAddress);
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.up}>
                <Text style={styles.name}>{name}</Text>
                <TouchableOpacity
                    style={[styles.radio, selected && styles.selected]}
                    onPress={onSelect}
                />
            </View>
            <View style={styles.down}>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.edit} onPress={() => setIsModalVisible(true)}>Edit</Text>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Address</Text>
                        <TextInput
                            style={styles.input}
                            value={editableName}
                            onChangeText={setEditableName}
                            placeholder="Name"
                        />
                        <TextInput
                            style={styles.input}
                            value={editableAddress}
                            onChangeText={setEditableAddress}
                            placeholder="Address"
                        />
                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.saveButton]}
                                onPress={handleSave}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        marginBottom: 32,
        gap: 8
    },
    up: {
        ...CommonStyles.alignCenterJustifyBetweenRow,
    },
    down: {
        ...CommonStyles.justifyBetweenRow,
        alignItems: 'flex-end'
    },
    name: {
        ...TypographyStyles.RegularTightSemiBold,
        color: colors.ink.base
    },
    radio: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderRadius: 32,
        borderColor: colors.sky.base
    },
    selected: {
        borderColor: colors.blue.base,
        borderWidth: 9
    },
    edit: {
        ...TypographyStyles.RegularTightSemiBold,
        color: colors.primary.base
    },
    address: {
        ...TypographyStyles.SmallNormalRegular,
        color: colors.ink.lighter,
        width: '70%'
    },
    modalContainer: {
        ...CommonStyles.flexAlignJustifyCenter,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
        alignItems: 'center'
    },
    modalTitle: {
        ...TypographyStyles.RegularTightSemiBold,
        marginBottom: 20
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: colors.ink.lighter,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    modalButtons: {
        ...CommonStyles.justifyBetweenRow,
        width: '100%'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    cancelButton: {
        backgroundColor: colors.ink.lighter
    },
    saveButton: {
        backgroundColor: colors.primary.base
    },
    buttonText: {
        color: colors.white
    }
});
