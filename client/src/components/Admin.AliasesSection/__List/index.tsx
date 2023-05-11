import { useState } from "react";
import b_ from "b_";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemText,
  Dialog,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStore } from "effector-react";

import { $password } from "../../../store/Password";
import {
  $aliases,
  aliasesEvents,
  getAliasesRequest,
} from "../../../store/Alias";
import {
  $config,
  $editableConfig,
  deleteConfigRequest,
  getConfigRequest,
  patchConfigRequest,
} from "../../../store/Config";
import { ConfirmationDialog } from "../../ConfirmationDialog";
import { UserSettings } from "../../UserSettings";

export const b = b_.with("aliases-section");

const useStyles = makeStyles(() => ({
  listItem: {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
    maxHeight: "56px",
    flexBasis: "calc(50% - 10px)",
    cursor: "pointer",
    "&:hover": {
      borderColor: "black",
    },
  },
  list: {
    gap: "10px",
    marginTop: "9px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
}));

export const AliasesSectionList = ({
  selectedLevel,
}: {
  selectedLevel: number;
}) => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedAlias, setSelectedAlias] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes2 = useStyles();
  const pending = useStore(getAliasesRequest.pending);

  const password = useStore($password);
  const aliases = useStore($aliases);
  const selectedConfig = useStore($config);
  const editableConfig = useStore($editableConfig);

  const { alias, networks, password: newPassword, ...props } = editableConfig;

  const handleOpenModal = (user: string) => {
    setSelectedAlias(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAliasClick = async (alias: string) => {
    setSelectedUser(alias);
    await getConfigRequest({ alias, password });
  };

  const handleAliasDelete = async () => {
    aliasesEvents.deleteAlias(selectedAlias);
    await deleteConfigRequest({ alias: selectedAlias, password });
    handleCloseModal();
  };

  const handleDialogClose = async () => {
    setSelectedUser(null);
    await patchConfigRequest({
      alias,
      config: {
        ...props,
        networks,
        password: newPassword,
        alias,
      },
      password,
    });

    if (selectedLevel === -1) {
      getAliasesRequest();
    } else if (selectedLevel !== null) {
      getAliasesRequest(selectedLevel);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
        marginTop: "15px",
        textAlign: "center",
      }}
    >
      {aliases.length > 0 && (
        <Typography variant="h6" gutterBottom>
          List of aliases
        </Typography>
      )}
      <List className={classes2.list}>
        {aliases.map((user) => (
          <ListItem
            key={user}
            onClick={() => {
              if (!pending) {
                handleAliasClick(user);
              }
            }}
            className={classes2.listItem}
          >
            <ListItemText primary={user} />
            <IconButton
              color="error"
              aria-label="delete user"
              onClick={(e) => {
                if (!pending) {
                  e.stopPropagation();
                  handleOpenModal(user);
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Dialog
        open={selectedUser !== null}
        onClose={handleDialogClose}
        classes={{ paper: b("dialog") }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleDialogClose}>
            <Close />
          </IconButton>
        </div>
        {selectedConfig && <UserSettings config={selectedConfig} />}
      </Dialog>
      <ConfirmationDialog
        isOpen={isModalOpen}
        title="Are you sure?"
        content="Do you really want to perform this action?"
        onCancel={handleCloseModal}
        onConfirm={handleAliasDelete}
      />
    </Box>
  );
};
