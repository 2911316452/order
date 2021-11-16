<?php

class DatabaseSystem {
    private $mysql;

    function __construct() {
        $mysql = new mysqli("localhost:9908", "root", "usbw");
        if (!$mysql) {
            exit(json_encode("数据库连接失败"));
        }
        $mysql->select_db("data");
        $this->setMysql($mysql);

    }

    /**
     * @param  $mysql
     */
    public function setMysql($mysql) {
        $this->mysql = $mysql;
    }

    /**
     * @return
     */
    public function getMysql() {
        return $this->mysql;
    }

    /**
     * @param array $arr
     * @param string $tablename
     * @return mixed
     *
     * $obj=array(
     * "name"=>"1111",
     * "password"=>"2222"
     * )
     *
     */

    function insert($arr, $tablename) {
$this->getMysql()->query("set names 'utf8'");
        $sql = "INSERT INTO " . $tablename;
        $key = " (";
        $value = "(";
        foreach ($arr as $ke => $val) {
            $key .= $ke . ",";
            $value .= "'" . $val . "'" . ",";
        }
        $key = substr($key, 0, strlen($key) - 1);
        $value = substr($value, 0, strlen($value) - 1);
        $this->getMysql()->query("alter table " . $tablename . " AUTO_INCREMENT=1");
        return $this->getMysql()->query($sql . $key . ") VALUES " . $value . ")");
    }

    /***
     * @param array $obj
     * @param string $tablename
     * @return
     *
     * $obj=array(
     *  key=>["s","value"]
     * )
     */

    function select($obj, $tablename) {
        $this->getMysql()->query("set names 'utf8'");
        $sql = "SELECT * FROM " . $tablename . " WHERE ";
        $type = "";
        $values = [];
        $arr = "\$use->bind_param(\$type,";
        $i = 0;
        foreach ($obj as $key => $value) {
            $sql .= $key . " =? and ";
            array_push($values, $value[1]);
            $type .= $value[0];
            $arr .= "\$values[$i],";
            $i++;
        }
        $arr = substr($arr, 0, strlen($arr) - 1) . ")";
        $sql = substr($sql, 0, strlen($sql) - 5);
        $use = $this->getMysql()->prepare($sql);
        eval("return $arr;");
        $use->execute();
        $resault = $use->get_result();
        return $resault->fetch_assoc();
    }

    function selectAll($tablename, $start, $end) {
        $this->getMysql()->query("set names 'utf8'");
        $arr = array();
        $sql = "SELECT * FROM " . $tablename . " ORDER BY 'oderid' desc limit " . $start . " , " . $end;
        $result = $this->getMysql()->query($sql);
        while ($a = $result->fetch_assoc()) {
            array_push($arr, $a);
        }
        return $arr;
    }

    function delete($obj, $tablename) {
        $sql = "DELETE FROM " . $tablename . " WHERE ";
        foreach ($obj as $key => $value) {
            $sql .= $key . " = '" . $value . "'";
        }
        $this->getMysql()->query($sql);
        return mysqli_affected_rows($this->getMysql());
    }

    function update($obj, $tablename) {
$this->getMysql()->query("set names 'utf8'");
        $sql = "UPDATE " . $tablename . " SET ";
        $mask = "";
        $i = 0;
        foreach ($obj as $key => $value) {
            $mask = $i === 0 ? $key . " = '" . $value . "'" : $mask;
            $sql = $i !== 0 ? $sql . $key . " = " . "'" . $value . "' , " : $sql;
            $i++;
        }
        $sql = substr($sql, 0, strlen($sql) - 3);
        $sql .= " WHERE " . $mask;
        return $this->getMysql()->query($sql);
    }
}

$ds = new DatabaseSystem();
