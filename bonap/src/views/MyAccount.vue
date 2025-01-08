<template>
    <section id="profile" class="fields">
        <div class="container" id="page__title">
            <div class="section-header">
                <h1 class="invisible">Profil</h1>
            </div>
        </div>
        <div class="container" id="identity">
            <div class="subtitle">
                <h2>Identité</h2>
                <button class="clients__buttons__yellow witcher" @click="toggleEdit('identity')">
                    <img class="identity__icon" src="../../src/img/icon/editing.png" />
                </button>
            </div>
            <div class="grid">
                <div class="together">
                    <div class="clients__alone" v-for="(field, index) in identityFields" :key="index">
                        <div class="grid__item__left">
                            <p>{{ field.label }}</p>
                        </div>
                        <div class="changed" v-if="!field.editing">
                            <p>{{ field.value }}</p>
                        </div>
                        <div class="change" v-else>
                            <input :id="'change__' + field.name" type="text" class="change__type" :placeholder="field.value" v-model="field.value" />
                        </div>
                    </div>
                    <div class="change" v-if="isEditing('identity')">
                        <button class="submit-button" @click="saveChanges('identity')">Enregistrer</button>
                    </div>
                </div>
                <div class="together">
                    <div class="clients__alone">
                        <div class="grid__item__left">
                            <p>Facturation</p>
                        </div>
                        <div class="clients__alone" id="hide__me">
                            <label for="invoice__select"></label>
                            <select name="invoice" id="invoice__select" v-model="selectedInvoice">
                                <option v-for="(invoice, index) in invoices" :key="index" :value="invoice">{{ invoice }}</option>
                            </select>
                            <button class="clients__buttons__yellow addproof" @click="toggleEdit('invoice')">
                                <img class="clients__icon__intern" src="../../src/img/icon/add.png" />
                            </button>
                            <button class="clients__buttons__yellow proof" @click="removeInvoice">
                                <img class="clients__icon__intern" src="../../src/img/icon/delete.png" />
                            </button>
                        </div>
                        <div class="hide" v-if="isEditing('invoice')">
                            <div class="resto-id-specs" id="invoice__newp">
                                <div class="close__invoice">
                                    <input id="invoice__name" type="text" class="add__invoice" placeholder=" Adresse" v-model="newInvoice.address" />
                                    <button class="clients__buttons__yellow proof__off" @click="toggleEdit('invoice')">
                                        <img class="clients__icon__intern" src="../../src/img/icon/close.png" />
                                    </button>
                                </div>
                                <input id="invoice__number" type="text" class="add__invoice" placeholder=" Code postal" v-model="newInvoice.postalCode" />
                                <input id="invoice__number" type="text" class="add__invoice" placeholder=" Ville" v-model="newInvoice.city" />
                                <button class="submit-button" @click="addInvoice">Enregistrer</button>
                            </div>
                        </div>
                    </div>
                    <div class="clients__alone">
                        <div class="grid__item__left">
                            <p>Paiement</p>
                        </div>
                        <div class="clients__alone" id="find__me">
                            <label for="pay__select"></label>
                            <select name="pay" id="pay__select" v-model="selectedPayment">
                                <option v-for="(payment, index) in payments" :key="index" :value="payment">{{ payment }}</option>
                            </select>
                            <button class="clients__buttons__yellow turn" @click="toggleEdit('payment')">
                                <img class="clients__icon__intern" src="../../src/img/icon/add.png" />
                            </button>
                            <button class="clients__buttons__yellow turn" @click="removePayment">
                                <img class="clients__icon__intern" src="../../src/img/icon/delete.png" />
                            </button>
                        </div>
                        <div class="hide" v-if="isEditing('payment')">
                            <div class="resto-id-specs" id="clients__newp">
                                <div class="selector">
                                    <label for="type__select"></label>
                                    <select name="type" id="type__select" v-model="newPayment.type">
                                        <option value="Carte bleue">Carte bleue</option>
                                        <option value="Carte restaurant">Carte restaurant</option>
                                        <option value="Autre carte">Autre carte</option>
                                    </select>
                                    <button class="clients__buttons__yellow turn__off" @click="toggleEdit('payment')">
                                        <img class="clients__icon__intern" src="../../src/img/icon/close.png" />
                                    </button>
                                </div>
                                <input id="add__name" type="text" class="add__type" placeholder=" Titulaire" v-model="newPayment.holder" />
                                <input id="add__number" type="text" class="add__type" placeholder=" Numéro" v-model="newPayment.number" />
                                <input id="add__number" type="text" class="add__type" placeholder=" Expire le mm/aa" v-model="newPayment.expiry" />
                                <button class="submit-button" @click="addPayment">Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container" id="history">
            <div class="subtitle">
                <h2>Historique</h2>
            </div>
            <div class="table">
                <table id="historyTable" class="display">
                    <thead>
                        <tr>
                            <th class="first">Date</th>
                            <th class="first">Restaurant</th>
                            <th class="first">Prix</th>
                            <th class="first">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(history, index) in histories" :key="index">
                            <td class="follow">{{ history.date }}</td>
                            <td class="follow">{{ history.restaurant }}</td>
                            <td class="follow">{{ history.price }}</td>
                            <td>
                                <button class="clients__buttons__black">
                                    <img class="clients__icon" src="../../src/img/icon/upload.png" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="add">
                <p>En voir plus</p>
                <button class="clients__buttons__black">
                    <img class="clients__icon" src="../../src/img/icon/add.png" />
                </button>
            </div>
        </div>

        <div class="container" id="love">
            <div class="subtitle">
                <h2>Restaurant favori</h2>
                <button class="clients__buttons__yellow whois" @click="toggleEdit('favorite')">
                    <img class="identity__icon2" src="../../src/img/icon/editing.png" />
                </button>
            </div>
            <div id="loved" v-if="!isEditing('favorite')">
                <p>{{ favoriteRestaurant }}</p>
            </div>
            <div class="clients__favorite" v-else>
                <label for="favorite__select"></label>
                <select name="favorite" id="favorite__select" v-model="favoriteRestaurant">
                    <option value="" class="option">Choisir son favori</option>
                    <option v-for="(restaurant, index) in favoriteOptions" :key="index" :value="restaurant">{{ restaurant }}</option>
                </select>
                <button class="submit-button" @click="saveChanges('favorite')">Enregistrer</button>
            </div>
        </div>

        <div class="container" id="setup">
            <div class="subtitle">
                <h2>Gestion des notifications</h2>
            </div>
            <div id="chosen">
                <p>
                    Vous pouvez désactiver les notifications à tout moment. Nous nous engageons à ne jamais vendre vos informations à des tiers.
                </p>
                <br />
                <input type="checkbox" id="states" v-model="notifications.orders" />
                <label for="states">Notifications des commandes en cours</label>
                <br />
                <p>Soyez informé(e) lorsque votre livreur ou livreuse est en route et laissez-lui la possibilité de vous contacter si nécessaire.</p>
                <br />
                <input type="checkbox" id="email" v-model="notifications.email" />
                <label for="email">Réception par e-mail</label>
                <br />
                <input type="checkbox" id="push" v-model="notifications.push" />
                <label for="push">Réception push</label>
                <br />
                <input type="checkbox" id="publicity" v-model="notifications.promotions" />
                <label for="publicity">Notifications promotionnelles</label>
                <br />
                <p>Recevez les offres spéciales et les promotions.</p>
                <br />
            </div>
            <div id="chosen2">
                <br />
                <div class="bsure">
                    <button class="Me" @click="confirmDelete">Supprimer le compte</button>
                    <p>Vous voulez nous quitter ? Nous serons tristes mais c'est votre choix.</p>
                </div>
                <div class="csure" v-if="confirmingDelete">
                    <p class="psure">En êtes-vous certain(e) ? Votre compte ne sera pas récupérable ensuite.</p>
                    <button @click="deleteAccount">Oui, supprimer le compte.</button>
                    <img id="delete__picture" src="../../src/img/delete.jpg" alt="" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const identityFields = ref([
    { label: 'Nom, Prénom', name: 'name', value: 'John Doe', editing: false },
    { label: 'Livraison', name: 'address', value: '56 rue de Brest', editing: false },
    { label: 'Code postal', name: 'postalCode', value: '22300', editing: false },
    { label: 'Ville', name: 'city', value: 'Lannion', editing: false },
    { label: 'E-mail', name: 'email', value: 'monadresse@email.fr', editing: false },
    { label: 'Téléphone', name: 'phone', value: '06 78 98 65 15', editing: false },
]);

const invoices = ref([
    '32 rue de Paris, Lannion',
    '22 rue de Paris, Morlaix',
    '12 rue de Paris, Plougannou',
]);

const payments = ref([
    'Carte bleue #2659',
    'Carte bleue #3274',
    'Carte restaurant',
]);

const histories = ref([
    { date: '12/06/2024', restaurant: 'Aux plaisirs gustatifs', price: '19 €' },
    { date: '13/08/2024', restaurant: 'Aux plaisirs gustatifs', price: '23 €' },
    { date: '15/09/2024', restaurant: 'La corne d\'abondance', price: '32 €' },
]);

const favoriteOptions = ref([
    'Aux plaisirs gustatifs',
    'Mangez-moi',
    'Le 7e sens',
]);

const notifications = ref({
    orders: true,
    email: true,
    push: true,
    promotions: true,
});

const favoriteRestaurant = ref('Aux plaisirs gustatifs');
const selectedInvoice = ref(invoices.value[0]);
const selectedPayment = ref(payments.value[0]);

const newInvoice = ref({ address: '', postalCode: '', city: '' });
const newPayment = ref({ type: '', holder: '', number: '', expiry: '' });

const editingSection = ref('');

const toggleEdit = (section) => {
    editingSection.value = editingSection.value === section ? '' : section;
};

const isEditing = (section) => {
    return editingSection.value === section;
};

const saveChanges = (section) => {
    toggleEdit(section);
};

const addInvoice = () => {
    invoices.value.push(`${newInvoice.value.address}, ${newInvoice.value.postalCode}, ${newInvoice.value.city}`);
    newInvoice.value = { address: '', postalCode: '', city: '' };
    toggleEdit('invoice');
};

const removeInvoice = () => {
    invoices.value = invoices.value.filter(invoice => invoice !== selectedInvoice.value);
    selectedInvoice.value = invoices.value[0];
};

const addPayment = () => {
    payments.value.push(`${newPayment.value.type} #${newPayment.value.number}`);
    newPayment.value = { type: '', holder: '', number: '', expiry: '' };
    toggleEdit('payment');
};

const removePayment = () => {
    payments.value = payments.value.filter(payment => payment !== selectedPayment.value);
    selectedPayment.value = payments.value[0];
};

const confirmingDelete = ref(false);

const confirmDelete = () => {
    confirmingDelete.value = true;
};

const deleteAccount = () => {
    // Logic to delete the account
};

onMounted(() => {
    $('#historyTable').DataTable();
});
</script>

<style scoped>
.fields {
    padding: 20px;
}

.container {
    margin-bottom: 20px;
}

.section-header h1 {
    visibility: hidden;
}

.subtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.grid {
    display: flex;
    flex-wrap: wrap;
}

.together {
    flex: 1;
    margin-right: 20px;
}

.clients__alone {
    margin-bottom: 10px;
}

.grid__item__left {
    width: 150px;
    font-weight: bold;
}

.changed,
.change {
    flex: 1;
}

.change__type {
    width: 100%;
    padding: 5px;
}

.clients__buttons__yellow,
.clients__buttons__black {
    background-color: yellow;
    border: none;
    cursor: pointer;
}

.clients__buttons__yellow img,
.clients__buttons__black img {
    width: 15px;
    height: 15px;
}

.submit-button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}

.table {
    margin-top: 20px;
}

.table th,
.table td {
    padding: 10px;
    border: 1px solid #ddd;
}

.add {
    display: flex;
    align-items: center;
}

.add p {
    margin-right: 10px;
}

#chosen p,
#chosen2 p {
    margin-bottom: 10px;
}

.bsure,
.csure {
    margin-top: 20px;
}

.psure {
    color: red;
}
</style>