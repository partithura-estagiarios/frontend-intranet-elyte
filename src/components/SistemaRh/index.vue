<template>
  <div class="side borderRad">
    <q-card class="q-mx-lg row justify-center shadow-7">
      <q-card-section class="q-my-md">
        <span class="text-black row font text-bold">
          {{ $t("titles.HrSystem") }}
          <q-icon
            color="primary"
            class="q-ml-sm"
            size="2rem"
            name="supervisor_account"
          />
        </span>
        <q-separator size="0.5rem" color="primary" class="bar-style" />
      </q-card-section>
      <q-card-section class="row">
        <q-item
          v-for="icon in gestaoList"
          :key="icon.id"
          class="col-3 column q-my-md items-center"
          clickable
        >
          <q-item-section avatar>
            <q-avatar class="row" size="7rem">
              <q-icon class="border" :name="icon.img" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="row">
            <q-item-label class="text-black">
              {{ $t(icon.label) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
const gestaoList = [
  {
    id: "1",
    img: "speaker_notes",
    label: "titles.SubTitlesHr.HRDiscloses",
    link: "http:/totvs-login/loginForm",
  },
  {
    id: "2",
    img: "cake",
    label: "titles.SubTitlesHr.Birthdays",
    link: "elyte.partithura.app/dashboard/",
  },
  {
    id: "3",
    img: "campaign",
    label: "titles.SubTitlesHr.FixedSchedule",
  },
  {
    id: "4",
    img: "email",
    label: "titles.SubTitlesHr.ContactWithDirector",
  },
  {
    id: "5",
    img: "menu_book",
    label: "titles.SubTitlesHr.Menu",
  },
  {
    id: "6",
    img: "phone",
    label: "titles.SubTitlesHr.Fones",
  },
  {
    id: "7",
    img: "calendar_month",
    label: "titles.SubTitlesHr.Agenda",
  },
];
</script>

<style scoped>
.border {
  border: 8px solid;
  border-radius: 50%;
  padding: 0.3rem;
  color: rgb(255, 0, 0);
  width: 4.5rem;
  height: 4.5rem;
}

.border:hover {
  color: rgb(121, 184, 71);
}
.bar-style {
  border-radius: 10px;
}

.font {
  font-size: 1.6rem;
}
.borderRad {
  border-radius: 60px;
}
</style>
