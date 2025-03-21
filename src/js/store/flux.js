const getState = ({ getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {

			getContacts: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/armando/contacts");
					const data = await response.json();
					console.log(data.contacts);
					setStore({ contacts: data.contacts });

				} catch (error) {
					console.log(error);
				}
			},

			createAgenda: async (agendaData) => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/armando/contacts", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(agendaData)
					});
					if (!response.ok) {
						throw new Error("No se pudo crear contacto");
					}
					const data = await response.json();
					console.log(data);

				} catch (error) {
					console.log(error);
				}
			},
			createContact: async (newContact) => {
                try {
                    const result = await fetch("https://playground.4geeks.com/contact/agendas/armando/contacts", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newContact)
                    });
					console.log(result);
					
                    if (!result.ok) {
                        throw new Error(result.statusText);
                    }
                    const data = await result.json();
                    setStore(prevState => ({
                    listadecontactos: [...prevState.listadecontactos, data]
                    }));
                } catch (error) {
                    console.error("Error creating contact:", error);
                }
            },
			deleteContact: async (id) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/armando/contacts/${id}`, {
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
					});

					if (response.ok) {
						await getActions().getContacts();
					} else {
						console.error("Failed to delete contact", response.status);
					}
				} catch (error) {
					console.log("Error deleting contact:", error);
				}
			},
			updateContact: async (id, updatedData) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/armando/contacts/${id}`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(updatedData),
					});

					if (!response.ok) throw new Error("Failed to update contact");

					getActions().getContacts();
				} catch (error) {
					console.error("Error updating contact:", error);
				}
			}
		}
	};
};

export default getState;
