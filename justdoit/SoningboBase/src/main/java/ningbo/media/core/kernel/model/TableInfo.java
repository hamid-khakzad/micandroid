package ningbo.media.core.kernel.model;

import java.util.List;

public class TableInfo {

	private String tableName;
	private String tableComment;
	private String createTime;
	private int rows;

	private List<ColumnInfo> columnList;

	public List<ColumnInfo> getColumnList() {
		return columnList;
	}

	public void setColumnList(List<ColumnInfo> columnList) {
		this.columnList = columnList;
	}

	/**
	 * 
	 * @return 数据库表名称
	 */
	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	/**
	 * 
	 * @return 数据库表的描述
	 */
	public String getTableComment() {
		return tableComment;
	}

	public void setTableComment(String tableComment) {
		this.tableComment = tableComment;
	}

	/**
	 * 
	 * @return 数据库表创建时间
	 */
	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	/**
	 * 
	 * @return 数据库表目前有多少行数据
	 */
	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	@Override
	public String toString() {
		return "表结构信息：{" + "表名='" + tableName + '\'' + ", 表作用描述='"
				+ tableComment + '\'' + ", 表创建时间='" + createTime + '\''
				+ ", 当前有多少行数据=" + rows + '}';
	}

}
