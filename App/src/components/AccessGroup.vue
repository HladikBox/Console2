<template>
  <div class="bg-w">
    <MyHeader></MyHeader>
    <div class="flex-row margin-top-4x margin-bottom">
      <div class="flex-1"></div>
      <div class="container bg-w bd" v-if="Member!=null">
        <div class="padding-4x">
          <div class="flex-row">
            <el-page-header class="margin-right-1x" @back="goBack" content="开发组管理"></el-page-header>
            <div>
              <el-tooltip content="开发组管理可以设置不同的用户到你的开发组，在项目的开发过程中做一个权限管理的功能" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="tablebody">
            <el-table :data="grouplist" style="width: 100%">
              <el-table-column label="组名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="优先级">
                <template slot-scope="scope">
                  <span>{{ scope.row.seq }}</span>
                </template>
              </el-table-column>
              <el-table-column label="默认入组">
                <template slot-scope="scope">
                  <span>{{ scope.row.isdefault_value=='Y'?"是":"否" }}</span>
                </template>
              </el-table-column>
              <el-table-column label="权限">
                <template slot-scope="scope">
                  <div>{{ scope.row.adminright_value=="Y"?"管理员":"" }}</div>
                  <div>{{ scope.row.viewerright_value=="Y"?"观察员":"" }}</div>
                  <div>{{ scope.row.designerright_value=="Y"?"需求产品设计":"" }}</div>
                  <div>{{ scope.row.developerright_value=="Y"?"工程师":"" }}</div>
                  <div>{{ scope.row.testright_value=="Y"?"测试运维":"" }}</div>
                </template>
              </el-table-column>
              <el-table-column label="人员">
                <template slot-scope="scope">
                  <el-popover  trigger="hover" placement="top" v-for="p of scope.row.peoples" :key="p">
                    <p>开发号: {{p.yycno }}</p>
                    <p>姓名: {{ p.name }}</p>
                    <p>手机号: {{ p.mobile }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="mini" class="margin-top-1x pointer">{{ p.name }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="scope">
                  <span>{{ scope.row.description }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="220px">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete( scope.row.id)">删除</el-button>
                  <el-button class="margin-top-1x" size="mini" @click="handlePeopleEdit(scope.row.id)">编辑人员</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-divider></el-divider>
          <div>
            <el-button type="primary" plain icon="el-icon-plus" @click="createNewGroup">新增开发组</el-button>
          </div>
        </div>
      </div>
      <div class="flex-1"></div>
    </div>

    <el-dialog
      v-loading="loading"
      title="管理组详情"
      :visible.sync="centerDialogVisible"
      v-if="group!=null"
      width="600px"
      center
    >
      <div class="flex-row flex-center">
        <div class="width-1x">
          <span class="f-d">*</span>组名
        </div>
        <div class="flex-1">
          <el-input v-model="group.name" placeholder="请输入组名" maxlength="20"></el-input>
        </div>
      </div>
      <div class="flex-row flex-center margin-top">
        <div class="width-1x">优先级</div>
        <div class="flex-1">
          <el-input-number size="small" v-model="group.seq" :min="1" :max="10" label="设置优先级"></el-input-number>
        </div>
      </div>
      <div class="flex-row flex-center margin-top">
        <div class="width-1x">默认组</div>
        <div class="flex-1">
          <el-switch v-model="group.isdefault" active-color="#13ce66" inactive-color="#cccccc"></el-switch>
        </div>
      </div>
      <div class="flex-row flex-center margin-top">
        <div class="width-1x">备注</div>
        <div class="flex-1">
          <el-input v-model="group.description" placeholder="请输入备注" maxlength="40"></el-input>
        </div>
      </div>
      <div class="flex-row margin-top">
        <div class="width-1x">权限组</div>
        <div class="flex-1">
          <div>
            <el-checkbox v-model="group.adminright">管理员</el-checkbox>
          </div>
          <div class="margin-top">
            <el-checkbox v-model="group.viewerright">观察员</el-checkbox>
          </div>
          <div class="margin-top">
            <el-checkbox v-model="group.designerright">需求产品测试</el-checkbox>
          </div>
          <div class="margin-top">
            <el-checkbox v-model="group.developerright">工程师</el-checkbox>
          </div>
          <div class="margin-top">
            <el-checkbox v-model="group.testright">测试运维</el-checkbox>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="flex-row flex-center">
        <div class="flex-1"></div>
        <div class="margin-right">
          <el-button @click="hidegroup">取消</el-button>
        </div>
        <div class="margin-left">
          <el-button type="primary" :disabled="group.name==''" @click="saveGroup">保存</el-button>
        </div>
        <div class="flex-1"></div>
      </div>
    </el-dialog>
    <el-dialog title="人员编辑" :visible.sync="peopledialogshow" width="650px" center>
      <div class="padding-4x">
        <div>
          <el-input placeholder="请输入邀请人手机号码或开发号" v-model="peoplesearch">
            <el-button slot="append" icon="el-icon-search" @click="searchpeople"></el-button>
          </el-input>
        </div>
        <div class="f-d margin-1x" v-if="searcherror!=''">{{searcherror}}</div>
        <div class="flex-row flex-wrap">
          <div
            class="peoplecard bd border margin-right margin-top"
            v-for="item of searchlist"
            :key="item"
          >
            <div class="margin-1x flex-row flex-center">
              <div class="flex-1 margin-right">
                <div>{{item.yycno}}</div>
                <div>{{item.name}}</div>
                <div>{{item.mobile}}</div>
              </div>
              <div>
                <div>
                  <i @click="addthistolist(item)" class="h4 f-p el-icon-circle-plus"></i>
                </div>
                <div class="margin-top-1x">
                  <i @click="removeinsearchlist(item)" class="h4 f-d el-icon-remove"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="margin-top">
          <el-table :data="peoplelist" style="width: 100%">
            <el-table-column prop="yycno" label="开发号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="mobile" label="手机"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="removepeople( scope.row.yycno)">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { Utils } from "../Utils";

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      centerDialogVisible: false,
      peopledialogshow: false,
      group: null,
      loading: false,
      grouplist: [],
      peoplesearch: "",
      peoplelist: [],
      searchlist: [],
      searcherror: "",
      peoplegroup_id: 0
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
    this.loadgrouplist();
  },
  methods: {
    loadPeopleList() {
      HttpHelper.Post("member/groupinfo", { id: this.peoplegroup_id }).then(
        group => {
          this.peoplelist = group.peoples;
        }
      );
    },
    handlePeopleEdit(id) {
      this.searchlist = [];
      this.searcherror = "";
      this.peoplegroup_id = id;
      this.peopledialogshow = true;
      this.loadPeopleList();
    },
    removeinsearchlist(item) {
      this.searchlist = this.searchlist.filter(t => {
        t.yycno != item.yycno;
      });
    },
    removepeople(yycno) {
      HttpHelper.Post("member/removemembertogroup", {
        yycno: yycno,
        peoplegroup_id: this.peoplegroup_id
      }).then(ret => {
        if (ret.code == 0) {
          this.$message({
            message: "移除成功",
            type: "success"
          });
          this.loadPeopleList();
          this.loadgrouplist();
        } else {
          this.$message({
            message: ret.result,
            type: "error"
          });
        }
      });
    },
    addthistolist(item) {
      HttpHelper.Post("member/addmembertogroup", {
        yycno: item.yycno,
        peoplegroup_id: this.peoplegroup_id
      }).then(ret => {
        if (ret.code == 0) {
          this.searchlist = this.searchlist.filter(t => {
            t.yycno != item.yycno;
          });
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.loadPeopleList();
          this.loadgrouplist();
        } else {
          this.$message({
            message: ret.result,
            type: "error"
          });
        }
      });
    },
    searchpeople(event) {
      HttpHelper.Post("member/searchmember", {
        key: this.peoplesearch,
        peoplegroup_id: this.peoplegroup_id
      }).then(ret => {
        if (ret.code == 0) {
          for (var item of this.searchlist) {
            if (item.yycno == ret.return.yycno) {
              this.searcherror = "搜索的开发者已存在";
              return;
            }
          }
          this.peoplesearch = "";
          this.searcherror = "";
          this.searchlist.push(ret.return);
        } else {
          this.searcherror = ret.result;
        }
      });
    },
    loadgrouplist() {
      HttpHelper.Post("member/grouplist", {}).then(grouplist => {
        this.grouplist = grouplist;
      });
    },
    hidegroup(event) {
      this.centerDialogVisible = false;
      this.group = null;
    },
    createNewGroup(event) {
      this.loading = false;
      this.centerDialogVisible = true;
      this.group = {
        id: 0,
        name: "",
        description: "",
        seq: 0,
        isdefault: false,
        adminright: false,
        viewerright: false,
        designerright: false,
        developerright: false,
        testright: false
      };
    },
    handleDelete(id) {
      this.$alert("确认删除该组吗？", "提示", {
        confirmButtonText: "确定",
        callback: action => {
          HttpHelper.Post("member/deletegroup", { id: id }).then(() => {
            this.loadgrouplist();
          });
        }
      });
    },
    handleEdit(id) {
      HttpHelper.Post("member/groupinfo", { id: id }).then(group => {
        group.isdefault = group.isdefault_value == "Y";
        group.adminright = group.adminright_value == "Y";
        group.viewerright = group.viewerright_value == "Y";
        group.designerright = group.designerright_value == "Y";
        group.developerright = group.developerright_value == "Y";
        group.testright = group.testright_value == "Y";
        this.group = group;
        this.loading = false;
        this.centerDialogVisible = true;
      });
    },
    saveGroup(event) {
      var json = {
        name: this.group.name,
        description: this.group.description,
        seq: this.group.seq,
        isdefault: this.group.isdefault ? "Y" : "N",
        adminright: this.group.adminright ? "Y" : "N",
        viewerright: this.group.viewerright ? "Y" : "N",
        designerright: this.group.designerright ? "Y" : "N",
        developerright: this.group.developerright ? "Y" : "N",
        testright: this.group.testright ? "Y" : "N"
      };
      if (this.group.id > 0) {
        json.primary_id = this.group.id;
      }
      this.loading = true;
      HttpHelper.Post("member/savegroup", json).then(content => {
        this.loading = true;
        this.hidegroup();
        this.loadgrouplist();
      });
    }
  }
};
</script>
<style scoped>
.tablebody {
  min-height: 300px;
}
.peoplecard {
}
</style>