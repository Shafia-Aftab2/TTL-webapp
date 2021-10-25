<template>
    <div>
        <MainNavbar></MainNavbar>
        <div class="home-section">
            <div class="sidebar">
                <div class="sidebar-title">
                    <h3 class="sidebar-title-text">
                        Nathan
                    </h3>
                    <button class="sidebar-add">
                        + New class
                    </button>
                </div>
            </div>
            <div class="right-section">
                <div class="right-section-head">
                    <h3>10A Spanish</h3>
                    <div>
                        <span>
                            <img width="30px" height="30px" src="../../../modules/Trophy.png" alt="">
                        </span>
                        <span>
                            <img width="30px" height="30px" src="../../../modules/Settings.png" alt="">
                        </span>
                    </div>
                </div>
                <div class="right-section-typs">
                    <button class="right-section-typs-btn active">Questions</button>
                    <button class="right-section-typs-btn">Students</button>
                </div>
                <br>
                <br>
                <div class="section-right-task">
                    <div class="custom-select">
                        <select>
                            <option value="0">Select car:</option>
                        </select>
                    </div>
                    <button class="new-task">
                        + New task
                    </button>
                </div>
                <br>
                <div class="question-card">
                    <div class="play-btn">
                        <img src="@/assets/Play.png" alt="">
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MainNavbar from '@/components/Navbar';

export default {
  name: 'Teache-home',
  components: {
    MainNavbar,
  },
};
</script>
<style scoped>
    .play-btn{
        width: 84px;
        height: 84px;
    }
    .question-card{
        width: 445px;
        height: 200px;
        background: #FFFFFF;
        border-radius: 10px;
    }
    .section-right-task{
        display: flex;
        justify-content: space-between;
    }
    .new-task{
        background: #F7D41E;
        border-radius: 10px;
        border: none;
        width: 143px;
        height: 49px;
        font-size: 16px;
    }
    .custom-select select{
        width: 445px;
        border: none;
        background: none;
        position: relative;
        font-size: 17px;
    }
    .right-section-typs-btn{
        border: none;
        background: none;
    }
    .active{
        border-bottom: 2px solid #F3D34B;
    }
    .right-section-typs{
        text-align: left;
    }
    .sidebar{
        width: 382px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 77px);
        background-color: white;
    }
    .right-section{
        padding: 20px 40px;
        width: 100%;
        height: calc(100vh - 77px);
        background-color: #F9F9F9;
    }
    .right-section-head{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .home-section{
        display: flex;
    }
    .sidebar-title-text{
        font-weight: bold;
        font-size: 18px;
        line-height: 28px;
    }
    .sidebar-add{
        font-size: 16px;
        width: 143px;
        height: 49px;
        background: #FFFFFF;
        border: 1px solid #F7D41E;
        border-radius: 10px;
    }
</style>

