<template>
  <div>
    <div class="flex-row">
      <div class="flex-1">
        <el-tree
          highlight-current
          :expand-on-click-node="false"
          default-expand-all
          :data="menu"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :render-content="renderContent"
        ></el-tree>
        <div class="margin-top-4x">
          <el-button size="mini" @click="addmainmenu">新增大项</el-button>
        </div>
        <div class="margin-top-4x">
          <el-button type="info" @click="loadmenu">刷新</el-button>
          <el-button type="success" @click="savemenu">更新菜单设计</el-button>
        </div>
      </div>
      <div class="flex-1">
        <div class="padding">
          <el-card class="box-card" v-if="menuoption!=null">
            <div slot="header" class="clearfix">
              <span>编辑</span>
            </div>
            <div>
              <div class="flex-row flex-center" v-if="menuoption.children!=null">
                <div class="width-1x">标识</div>
                <div class="flex-1">
                  <el-input v-model="menuoption.module"></el-input>
                </div>
              </div>
              <div class="flex-row flex-center margin-top-1x" v-if="menuoption.children!=null">
                <div class="width-1x">名称</div>
                <div class="flex-1">
                  <el-input v-model="menuoption.name"></el-input>
                </div>
              </div>
              <div class="flex-row flex-center" v-if="menuoption.children==null">
                <div class="width-1x">数据对象</div>
                <div class="flex-1">
                  <el-select v-model="menuoption.modelname" placeholder="请选择" @change="changemodel">
                    <el-option
                      v-for="item in modellist"
                      :key="item.modelname"
                      :label="item.modelname+' - '+item.name"
                      :value="item.modelname"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HttpHelper } from "../HttpHelper";
import { Utils } from "../Utils";

export default {
  props: {
    appinfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      menu: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      menuoption: null,
      modellist: []
    };
  },
  created() {
      this.loadmenu();
  },
  methods: {
    loadmenu() {
      HttpHelper.Post("app/modellist", { appalias: this.appinfo.alias }).then(
        modellist => {
          this.modellist = modellist;
          HttpHelper.Post("app/loadmenu", {
            appalias: this.appinfo.alias
          }).then(menuret => {
            var menu = [];
            menu.push({
              name: "系统管理",
              issys: true,
              children: [
                {
                  name: "主控台",
                  issys: true
                },
                {
                  name: "关于我们",
                  issys: true
                },
                {
                  name: "用户管理",
                  issys: true
                },
                {
                  name: "用户角色管理",
                  issys: true
                }
              ]
            });
            for (var i = 0; i < menuret.mainmenus.mainmenu.length; i++) {
              var m = {
                name: menuret.mainmenus.mainmenu[i].name,
                module: menuret.mainmenus.mainmenu[i].module,
                children: []
              };
              for (
                var j = 0;
                j < menuret.mainmenus.mainmenu[i].submenus.submenu.length;
                j++
              ) {
                var modelname =
                  menuret.mainmenus.mainmenu[i].submenus.submenu[j].model;
                var cm = { modelname: modelname, name: "未设置" };
                for (var model of modellist) {
                  if (modelname == model.modelname) {
                    cm.name = model.name;
                  }
                }
                m.children.push(cm);
              }
              menu.push(m);
            }
            this.menu = menu;
          });
        }
      );
    },
    savemenu() {
      var mainmenu = [];
      for (var i = 1; i < this.menu.length; i++) {
        var main = {
          module: this.menu[i].module,
          name: this.menu[i].name,
          submenus: { submenu: [] }
        };
        for (var j = 0; j < this.menu[i].children.length; j++) {
          main.submenus.submenu.push({
            name: this.menu[i].children[j].name,
            model: this.menu[i].children[j].modelname
          });
        }
        mainmenu.push(main);
      }
      var smenu = { mainmenus: { mainmenu: mainmenu } };

      HttpHelper.Post("app/savemenu", {
        appalias: this.appinfo.alias,
        menu: JSON.stringify(smenu)
      }).then(ret => {
        this.$message({
          message: "保存成功",
          type: "success"
        });
      });
    },
    addmainmenu() {
      this.menu.push({
        name: "菜单" + this.menu.length.toString(),
        module: "menu" + this.menu.length.toString(),
        children: []
      });
    },
    handleNodeClick(data) {
      console.log(data);
      if (data.issys != true) {
        this.menuoption = data;
      }
    },
    changemodel(modelname) {
      for (var model of this.modellist) {
        console.log("changemodel", model);
        if (modelname == model.modelname) {
          this.menuoption.name = model.name;
          this.menuoption.modelname = modelname;
          return;
        }
      }
    },
    appendsub(data) {
      data.children.push({ name: "未设置", modelname: "" });
    },
    remove(node, data) {
      for (var i = 0; i < this.menu.length; i++) {
        if (this.menu[i] == data) {
          this.menu.splice(i, 1);
        }
      }
    },
    removesub(node, data) {
      for (var i = 0; i < this.menu.length; i++) {
        for (var j = 0; j < this.menu[i].children.length; j++) {
          if (this.menu[i].children[j] == data) {
            this.menu[i].children.splice(j, 1);
            return;
          }
        }
      }
    },
    upsub(data) {
      var menu = [];
      for (var i = 0; i < this.menu.length; i++) {
        for (var j = 0; j < this.menu[i].children.length; j++) {
          if (this.menu[i].children[j] == data) {
            if (j == 0) {
              return;
            }
            var t = j - 1;
            var jopt = this.menu[i].children[j];
            var topt = this.menu[i].children[t];
            this.menu[i].children[t] = jopt;
            this.menu[i].children[j] = topt;
          }
        }
        menu.push(this.menu[i]);
      }
      this.menu = menu;
    },
    downsub(data) {
      var menu = [];
      for (var i = 0; i < this.menu.length; i++) {
        for (var j = 0; j < this.menu[i].children.length; j++) {
          if (this.menu[i].children[j] == data) {
            if (j == this.menu[i].children.length - 1) {
              break;
            }
            var t = j + 1;
            var jopt = this.menu[i].children[j];
            var topt = this.menu[i].children[t];
            this.menu[i].children[t] = jopt;
            this.menu[i].children[j] = topt;
          }
        }
        menu.push(this.menu[i]);
      }
      this.menu = menu;
    },
    renderContent(h, { node, data, store }) {
      if (data.issys == true) {
        return (
          <span class="custom-tree-node">
            <span>{data.name}</span>
          </span>
        );
      }
      if (data.children != null) {
        return (
          <span class="custom-tree-node">
            <span>{data.name}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.appendsub(data)}
              >
                添加菜单项
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                移除菜单
              </el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <span>{data.name}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.upsub(data)}
              >
                上移
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.downsub(data)}
              >
                下移
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.removesub(node, data)}
              >
                删除
              </el-button>
            </span>
          </span>
        );
      }
    }
  }
};
</script>
<style >
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>